// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { issues, issueTable, MILESTONE_TABLE } from '@/mocks/tables/issue';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';
import { IssuesTypes, CommentsTypes, ContentTypes, IssueHistoryTypes, ReactionResponseTypes } from '@/api/issue/types';
import { TEST_USER, USER_TABLE } from '@/mocks/handlers/auth';
import { LABEL_TABLE } from '@/mocks/handlers/label';
import { findMilestoneHelper } from '@/mocks/helpers/findMilestoneHelpers';
import { CustomErrorCode, makeErrRes } from '@/api/constants';

import {
  assigneesHistory,
  changeStateHistory,
  changeTitleHistory,
  labelHistory,
  milestoneHistory,
} from '@/mocks/helpers/issueHistoryHelper';
import { responseNewIssueData } from '@/mocks/helpers/newIssueHelper';
import { filterIdPassword, getAuther } from '@/mocks/helpers/authHelpers';

const findIssue = (issueId: number) => {
  const { openIssues, closedIssues } = issueTable;
  const contents = [...openIssues, ...closedIssues];

  const issue = contents.find((e) => e.id === Number(issueId));
  return issue;
};

const updateIssueTable = (newIssue: ContentTypes) => {
  const issuesContent = newIssue.closed ? issueTable.closedIssues : issueTable.openIssues;

  const newIssuesContent = issuesContent.map((content) => {
    if (content.id === newIssue.id) return newIssue;
    return content;
  });

  if (newIssue.closed) issueTable.closedIssues = newIssuesContent;
  else issueTable.openIssues = newIssuesContent;
};

const addIdCount = (type: 'issues' | 'comments' | 'reactions') => {
  const contents = [...issueTable.openIssues, ...issueTable.closedIssues];
  const count = { issues: contents.length, comments: 0, reactions: 0 };

  count.comments = contents.reduce((acc, cur) => acc + cur.comments.length, 0);

  count.reactions = contents.reduce(
    (accContentReactions, { comments }) =>
      accContentReactions +
      comments.reduce(
        (accCommentReactions, { issueCommentReactionsResponse }) =>
          accCommentReactions + issueCommentReactionsResponse.length,
        0,
      ),
    0,
  );

  const addId = () => {
    if (type === 'issues') {
      count.issues += 1;
      return count.issues;
    }

    if (type === 'comments') {
      count.comments += 1;
      return count.comments;
    }

    count.reactions += 1;
    return count.reactions;
  };

  return addId;
};

const addIssuesId = addIdCount('issues');
const addCommentsId = addIdCount('comments');
const addReactionsId = addIdCount('reactions');

export const issueHandlers = [
  // 이슈 전체 조회
  rest.get('api/issues', (req, res, ctx) => {
    const { openIssues, closedIssues } = issueTable;
    const page = Number(req.url.searchParams.get('page'));
    const queries = decodeURIComponent(req.url.searchParams.get('q')!);

    let content: ContentTypes[] = [...openIssues, ...closedIssues];

    const queriesArr = queries?.split('+');
    queriesArr?.forEach((query) => {
      const doubleQuotationReg = /(^"|"$)/g;
      const [key, value] = decodeURIComponent(query).split(':');
      const decodingValue = value?.replace(doubleQuotationReg, '');

      if (key === 'assignee') {
        if (!decodingValue) {
          content = content.filter((e) => !e.issueAssignees.issueAssignees.length);
          return;
        }
        content = content.filter((e) =>
          e.issueAssignees.issueAssignees.find((assignee) => assignee.nickname === decodingValue),
        );
      }

      if (key === 'label') {
        if (!decodingValue) {
          content = content.filter((e) => !e.issueLabels.issueLabels.length);
          return;
        }
        content = content.filter((e) => e.issueLabels.issueLabels.find((label) => label.title === decodingValue));
        return;
      }

      if (key === 'milestone') {
        if (!decodingValue) {
          content = content.filter((e) => e.milestone === null);
          return;
        }
        content = content.filter((e) => e.milestone?.title === decodingValue);
        return;
      }

      if (key === 'author') {
        content = content.filter((e) => e.author.nickname === decodingValue);
        return;
      }

      if (key === 'mentions') {
        content = content.filter((e) => e.comments.find((comment) => comment.author.nickname === decodingValue));
      }
    });

    const openIssueContents = content.filter((e) => e.closed === false);
    const closedIssueContents = content.filter((e) => e.closed === true);

    const OPEN_QUERY = 'is:"open"';
    const CLOSED_QUERY = 'is:"closed"';

    const openStateReg = new RegExp(OPEN_QUERY);
    const stateContent = queries.match(openStateReg) ? openIssueContents : closedIssueContents;

    const issueStateReg = new RegExp(`${OPEN_QUERY}|${CLOSED_QUERY}`);
    const filteredContent = queries.match(issueStateReg)
      ? stateContent
      : [...openIssueContents, ...closedIssueContents];

    const response: IssuesTypes = {
      openIssueCount: openIssueContents.length,
      closedIssueCount: closedIssueContents.length,
      issues: {
        content: filteredContent.sort((a, b) => b.id - a.id),
        pageable: {
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: 0,
          pageNumber: page,
          pageSize: 10,
          paged: true,
          unpaged: false,
        },
        last: true,
        totalPages: 1,
        totalElements: 8,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        first: true,
        size: 10,
        number: 0,
        numberOfElements: 8,
        empty: false,
      },
    };
    return res(ctx.status(200), ctx.json(response));
  }),

  // 이슈 단건 조회
  rest.get('api/issues/:issueId', (req, res, ctx) => {
    const { issueId } = req.params;

    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }
    return res(ctx.status(200), ctx.json(issue));
  }),

  // 이슈 제목 수정
  rest.patch('api/issues/:issueId/title', async (req, res, ctx) => {
    const { issueId } = req.params;
    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const { title } = await req.json();

    const newIssue = { ...issue, title };
    updateIssueTable(newIssue);

    const history: IssueHistoryTypes = changeTitleHistory({
      modifierInfo: getAuther(),
      previousTitle: issue.title,
      changedTitle: title,
    });

    issue.issueHistories.push(history);

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  // 이슈 상태 변경
  rest.patch('api/issues/update-status', async (req, res, ctx) => {
    const { status, ids } = await req.json();

    const { openIssues, closedIssues } = issueTable;
    let contents = [...openIssues, ...closedIssues];

    ids.forEach((id: number) => {
      contents = contents.map((content) => {
        if (content.id === id) {
          if (status === content.closed) return content;

          if (content.milestone) {
            if (content.closed && !content.milestone.closed) {
              MILESTONE_TABLE.openedMilestones.find((data) => data.id === content.milestone!.id)!.openIssueCount += 1;
              MILESTONE_TABLE.openedMilestones.find((data) => data.id === content.milestone!.id)!.closedIssueCount -= 1;
            }

            if (content.closed && content.milestone.closed) {
              MILESTONE_TABLE.closedMilestones.find((data) => data.id === content.milestone!.id)!.openIssueCount += 1;
              MILESTONE_TABLE.closedMilestones.find((data) => data.id === content.milestone!.id)!.closedIssueCount -= 1;
            }

            if (!content.closed && content.milestone.closed) {
              MILESTONE_TABLE.closedMilestones.find((data) => data.id === content.milestone!.id)!.openIssueCount -= 1;
              MILESTONE_TABLE.closedMilestones.find((data) => data.id === content.milestone!.id)!.closedIssueCount += 1;
            }

            if (!content.closed && !content.milestone.closed) {
              MILESTONE_TABLE.openedMilestones.find((data) => data.id === content.milestone!.id)!.openIssueCount -= 1;
              MILESTONE_TABLE.openedMilestones.find((data) => data.id === content.milestone!.id)!.closedIssueCount += 1;
            }
          }

          return { ...content, closed: status, lastModifiedAt: Date() };
        }
        return content;
      });
    });

    const openIssuesContent = contents.filter(({ closed }) => closed === false) || [];
    const closedIssuesContent = contents.filter(({ closed }) => closed === true) || [];

    issueTable.openIssues = openIssuesContent;
    issueTable.closedIssues = closedIssuesContent;

    const history: IssueHistoryTypes = changeStateHistory({
      modifierInfo: TEST_USER,
      action: status ? 'CLOSE' : 'OPEN',
    });
    contents.find((el) => el.id === ids[0])!.issueHistories.push(history);

    return res(ctx.status(204));
  }),

  // 이슈 코멘트 등록
  rest.post('api/issues/:issueId/comments', async (req, res, ctx) => {
    const { issueId } = req.params;
    const memberId = req.url.searchParams.get('memberId');

    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const { content } = await req.json();

    const newCommentId = addCommentsId();

    const author = USER_TABLE.find(({ id }) => id === Number(memberId))!;

    const newComment: CommentsTypes = {
      id: newCommentId,
      author: filterIdPassword(author),
      content,
      createdAt: Date(),
      issueCommentReactionsResponse: [],
    };

    const newIssue = { ...issue, comments: [...issue.comments, newComment] };
    updateIssueTable(newIssue);

    return res(ctx.status(204));
  }),

  // 이슈 코멘트 수정
  rest.patch('api/issues/:issueId/comments/:commentId', async (req, res, ctx) => {
    const { issueId, commentId } = req.params;
    const { content } = await req.json();

    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const newComment: CommentsTypes[] = issue.comments.map((comment) => {
      if (comment.id === Number(commentId)) {
        return { ...comment, content };
      }
      return comment;
    });

    const newIssue = { ...issue, comments: newComment };
    updateIssueTable(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  // 이슈 코멘트 삭제
  rest.delete('api/issues/:issueId/comments/:commentId', async (req, res, ctx) => {
    const { issueId, commentId } = req.params;

    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const newComment: CommentsTypes[] = issue.comments.filter((comment) => comment.id !== Number(commentId));

    const newIssue = { ...issue, comments: newComment };
    updateIssueTable(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  // 이모티콘 전체 조회
  rest.get('api/issues/comments/reactions/emojis', (req, res, ctx) => res(ctx.status(200), ctx.json(REACTIONS))),

  // 이슈 코멘트 리액션 추가
  rest.post('api/issues/:issueId/comments/:commentId/reactions/:emojiName', (req, res, ctx) => {
    const { issueId, commentId, emojiName } = req.params;
    const memberId = Number(req.url.searchParams.get('memberId'));
    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const newReactionId = addReactionsId();
    const { unicode } = REACTIONS.find((e) => emojiName === e.name)!;
    const newReactor = { id: memberId, nickname: USER_TABLE.find(({ id }) => id === memberId)?.nickname! };

    const newReaction: ReactionResponseTypes = {
      id: newReactionId,
      emoji: unicode,
      issueCommentReactorResponse: newReactor,
    };

    const newComments: CommentsTypes[] = issue.comments.map((comment) => {
      if (comment.id === Number(commentId)) {
        return {
          ...comment,
          issueCommentReactionsResponse: [...comment.issueCommentReactionsResponse, { ...newReaction }],
        };
      }
      return comment;
    });

    const newIssue: ContentTypes = { ...issue, comments: newComments };
    updateIssueTable(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  // 이슈 코멘트 리액션 삭제
  rest.delete('api/issues/:issueId/comments/:commentId/reactions/:reactionId', (req, res, ctx) => {
    const { issueId, commentId, reactionId } = req.params;
    const issue = findIssue(Number(issueId));

    if (!issue) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const newComments: CommentsTypes[] = issue.comments.map((comment) => {
      if (comment.id === Number(commentId)) {
        const newReactions: ReactionResponseTypes[] = comment.issueCommentReactionsResponse.filter(
          ({ id }) => id !== Number(reactionId),
        );

        return {
          ...comment,
          issueCommentReactionsResponse: newReactions,
        };
      }
      return comment;
    });

    const newIssue: ContentTypes = { ...issue, comments: newComments };
    updateIssueTable(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  // 이슈 등록
  rest.post('api/issues?memberId', async (req, res, ctx) => {
    const requestData = await req.json();
    const userId = Number(req.url.searchParams.get('memberId'));
    const { title } = requestData;

    const findAuthor = (memberId: number) => USER_TABLE.find((el) => el.id === memberId);
    const author = findAuthor(userId);

    if (!title) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    if (!author) {
      return res(ctx.status(400), ctx.json('존재하지 않는 유저입니다.'));
    }

    const newIssueId = addIssuesId();
    const newCommentId = addCommentsId();
    const newIssue = responseNewIssueData({ memberId: userId, author, newIssueId, newCommentId, ...requestData });
    issueTable.openIssues.push(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  rest.post('api/images/upload', async (req, res, ctx) => {
    const responseFileUrl = 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4';
    return res(ctx.status(200), ctx.json(responseFileUrl));
  }),

  rest.delete('api/issues/:issueId', async (req, res, ctx) => {
    const { issueId } = req.params;

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (findOpenIssues) {
      issueTable.openIssues = issueTable.openIssues.filter((el) => el.id !== Number(issueId));
      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      issueTable.closedIssues = issueTable.closedIssues.filter((el) => el.id !== Number(issueId));
      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),

  //  sidebar 레이블 추가 / 삭제
  rest.post('api/issues/:issueId/labels/:labelId', async (req, res, ctx) => {
    const { issueId, labelId } = req.params;

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (!findOpenIssues && !findCloseIssues) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const findLabel = LABEL_TABLE.find((label) => label.id === Number(labelId));

    if (!findLabel) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_LABEL)));
    }

    if (findOpenIssues) {
      findOpenIssues.issueLabels.issueLabels.push(findLabel!);

      const history: IssueHistoryTypes = labelHistory({
        modifierInfo: getAuther(),
        labelInfo: findLabel,
        action: 'ADD',
      });
      findOpenIssues.issueHistories.push(history);
      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      findCloseIssues.issueLabels.issueLabels.push(findLabel!);

      const history: IssueHistoryTypes = labelHistory({
        modifierInfo: getAuther(),
        labelInfo: findLabel,
        action: 'ADD',
      });
      findCloseIssues.issueHistories.push(history);
      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),

  rest.delete('api/issues/:issueId/labels/:labelId', async (req, res, ctx) => {
    const { issueId, labelId } = req.params;

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (!findOpenIssues && !findCloseIssues) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const findLabel = LABEL_TABLE.find((label) => label.id === Number(labelId));

    if (!findLabel) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_LABEL)));
    }

    if (findOpenIssues) {
      findOpenIssues.issueLabels.issueLabels = findOpenIssues.issueLabels.issueLabels.filter(
        (label) => label.id !== findLabel!.id,
      );

      const history: IssueHistoryTypes = labelHistory({
        modifierInfo: getAuther(),
        labelInfo: findLabel,
        action: 'REMOVE',
      });
      findOpenIssues.issueHistories.push(history);

      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      findCloseIssues.issueLabels.issueLabels = findCloseIssues.issueLabels.issueLabels.filter(
        (label) => label.id !== findLabel!.id,
      );

      const history: IssueHistoryTypes = labelHistory({
        modifierInfo: getAuther(),
        labelInfo: findLabel,
        action: 'REMOVE',
      });
      findCloseIssues.issueHistories.push(history);

      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),

  // sidebar 담당자 추가 / 삭제
  rest.post('api/issues/:issueId/assignees/:assigneeId', async (req, res, ctx) => {
    const { issueId, assigneeId } = req.params;

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (!findOpenIssues && !findCloseIssues) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const findAssinees = USER_TABLE.find((label) => label.id === Number(assigneeId));

    if (!findAssinees) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_MEMBER)));
    }

    if (findOpenIssues) {
      findOpenIssues.issueAssignees.issueAssignees.push(findAssinees!);

      const history: IssueHistoryTypes = assigneesHistory({
        modifierInfo: getAuther(),
        assigneeInfo: findAssinees,
        action: 'ADD',
      });
      findOpenIssues.issueHistories.push(history);
      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      findCloseIssues.issueAssignees.issueAssignees.push(findAssinees!);

      const history: IssueHistoryTypes = assigneesHistory({
        modifierInfo: getAuther(),
        assigneeInfo: findAssinees,
        action: 'ADD',
      });
      findCloseIssues.issueHistories.push(history);
      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),

  rest.delete('api/issues/:issueId/assignees?clear=false', async (req, res, ctx) => {
    const { issueId } = req.params;
    const assigneeId = Number(req.url.searchParams.get('assigneeId'));

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (!findOpenIssues && !findCloseIssues) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const findAssinees = USER_TABLE.find((label) => label.id === Number(assigneeId));

    if (!findAssinees) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_MEMBER)));
    }

    if (findOpenIssues) {
      findOpenIssues.issueAssignees.issueAssignees = findOpenIssues.issueAssignees.issueAssignees.filter(
        (assignee) => assignee.id !== findAssinees!.id,
      );

      const history: IssueHistoryTypes = assigneesHistory({
        modifierInfo: getAuther(),
        assigneeInfo: findAssinees,
        action: 'REMOVE',
      });
      findOpenIssues.issueHistories.push(history);
      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      findCloseIssues!.issueAssignees.issueAssignees = findCloseIssues.issueAssignees.issueAssignees.filter(
        (assignee) => assignee.id !== findAssinees!.id,
      );

      const history: IssueHistoryTypes = assigneesHistory({
        modifierInfo: getAuther(),
        assigneeInfo: findAssinees,
        action: 'REMOVE',
      });
      findCloseIssues.issueHistories.push(history);
      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),

  // sidebar 마일스톤 추가 / 삭제
  rest.patch('api/issues/:issueId/milestone/:milestoneId', async (req, res, ctx) => {
    const { issueId, milestoneId } = req.params;

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (!findOpenIssues && !findCloseIssues) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const findMilestone = findMilestoneHelper(Number(milestoneId));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_MILESTONE)));
    }

    if (findOpenIssues) {
      // 이전 마일스톤이 존재할 경우
      if (findOpenIssues.milestone !== null) {
        if (findOpenIssues.milestone.closed) {
          MILESTONE_TABLE.closedMilestones.find((data) => data.id === findOpenIssues.milestone!.id)!.openIssueCount =
            findOpenIssues.milestone.openIssueCount - 1;
        } else {
          MILESTONE_TABLE.openedMilestones.find((data) => data.id === findOpenIssues.milestone!.id)!.openIssueCount =
            findOpenIssues.milestone.openIssueCount - 1;
        }
      }

      findOpenIssues.milestone = findMilestone;

      const history: IssueHistoryTypes = milestoneHistory({
        modifierInfo: getAuther(),
        milestoneInfo: findMilestone,
        action: 'ADD',
      });
      findOpenIssues.issueHistories.push(history);

      // 마일스톤 카운트 추가
      if (findMilestone.closed) {
        MILESTONE_TABLE.closedMilestones.find((data) => data.id === findMilestone.id)!.openIssueCount =
          findMilestone.openIssueCount + 1;
      } else {
        MILESTONE_TABLE.openedMilestones.find((data) => data.id === findMilestone.id)!.openIssueCount =
          findMilestone.openIssueCount + 1;
      }

      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      // 이전 마일스톤이 존재할 경우
      if (findCloseIssues.milestone !== null) {
        if (findCloseIssues.milestone.closed) {
          MILESTONE_TABLE.closedMilestones.find((data) => data.id === findCloseIssues.milestone!.id)!.closedIssueCount =
            findCloseIssues.milestone.closedIssueCount - 1;
        } else {
          MILESTONE_TABLE.openedMilestones.find((data) => data.id === findCloseIssues.milestone!.id)!.closedIssueCount =
            findCloseIssues.milestone.closedIssueCount - 1;
        }
      }
      findCloseIssues.milestone = findMilestone;

      const history: IssueHistoryTypes = milestoneHistory({
        modifierInfo: getAuther(),
        milestoneInfo: findMilestone,
        action: 'ADD',
      });
      findCloseIssues.issueHistories.push(history);

      // 마일스톤 카운트 추가
      if (findMilestone.closed) {
        MILESTONE_TABLE.closedMilestones.find((data) => data.id === findMilestone.id)!.closedIssueCount =
          findMilestone.closedIssueCount + 1;
      } else {
        MILESTONE_TABLE.openedMilestones.find((data) => data.id === findMilestone.id)!.closedIssueCount =
          findMilestone.closedIssueCount + 1;
      }
      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),

  rest.delete('api/issues/:issueId/milestone/:milestoneId', async (req, res, ctx) => {
    const { issueId, milestoneId } = req.params;

    const findOpenIssues = issueTable.openIssues.find((el) => el.id === Number(issueId));
    const findCloseIssues = issueTable.closedIssues.find((el) => el.id === Number(issueId));

    if (!findOpenIssues && !findCloseIssues) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_ISSUE)));
    }

    const findMilestone = findMilestoneHelper(Number(milestoneId));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_MILESTONE)));
    }

    if (findOpenIssues) {
      findOpenIssues.milestone = null;

      const history: IssueHistoryTypes = milestoneHistory({
        modifierInfo: getAuther(),
        milestoneInfo: findMilestone,
        action: 'REMOVE',
      });
      findOpenIssues.issueHistories.push(history);

      // 마일스톤 카운트 제거
      if (findMilestone.closed) {
        MILESTONE_TABLE.closedMilestones.find((data) => data.id === findMilestone.id)!.openIssueCount =
          findMilestone.openIssueCount - 1;
      } else {
        MILESTONE_TABLE.openedMilestones.find((data) => data.id === findMilestone.id)!.openIssueCount =
          findMilestone.openIssueCount - 1;
      }

      return res(ctx.status(200), ctx.json(issues));
    }

    if (findCloseIssues) {
      findCloseIssues.milestone = null;

      const history: IssueHistoryTypes = milestoneHistory({
        modifierInfo: getAuther(),
        milestoneInfo: findMilestone,
        action: 'REMOVE',
      });
      findCloseIssues.issueHistories.push(history);

      // 마일스톤 카운트 제거
      if (findMilestone.closed) {
        MILESTONE_TABLE.closedMilestones.find((data) => data.id === findMilestone.id)!.closedIssueCount =
          findMilestone.closedIssueCount - 1;
      } else {
        MILESTONE_TABLE.openedMilestones.find((data) => data.id === findMilestone.id)!.closedIssueCount =
          findMilestone.closedIssueCount - 1;
      }

      return res(ctx.status(200), ctx.json(issues));
    }

    return res(ctx.status(200), ctx.json(issues));
  }),
];
