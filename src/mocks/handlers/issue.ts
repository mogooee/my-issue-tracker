// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { issueTable } from '@/mocks/tables/issue';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';
import { CommentsTypes, ContentTypes, IssuesTypes, ReactionResponseTypes } from '@/api/issue/types';
import { userTable } from '@/mocks/handlers/auth';
import { USER_LIST } from '@/components/Molecules/Dropdown/mock';
import { responseNewIssueData } from '@/mocks/tables/newIssueHelper';
import { doubleQuotationReg, issueStateReg, OPEN_QUERY } from '@/hooks/useFilter';

const message = {
  message: '',
};

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

const addIdCount = (type: 'comments' | 'reactions') => {
  const contents = [...issueTable.openIssues, ...issueTable.closedIssues];
  const count = { comments: 0, reactions: 0 };

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
    if (type === 'comments') {
      count.comments += 1;
      return count.comments;
    }

    count.reactions += 1;
    return count.reactions;
  };

  return addId;
};

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

    const openStateReg = new RegExp(OPEN_QUERY);
    const stateContent = queries.match(openStateReg) ? openIssueContents : closedIssueContents;

    const filteredContent = queries.match(issueStateReg)
      ? stateContent
      : [...openIssueContents, ...closedIssueContents];

    const response: IssuesTypes = {
      openIssueCount: openIssueContents.length,
      closedIssueCount: closedIssueContents.length,
      issues: {
        content: filteredContent,
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
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }
    return res(ctx.status(200), ctx.json(issue));
  }),

  // 이슈 제목 수정
  rest.patch('api/issues/:issueId/title', async (req, res, ctx) => {
    const { issueId } = req.params;
    const issue = findIssue(Number(issueId));

    if (!issue) {
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }

    const { title } = await req.json();

    if (!title) {
      message.message = '이슈 제목이 유효하지 않습니다.';
    }

    const newIssue = { ...issue, title };
    updateIssueTable(newIssue);

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
          return { ...content, closed: status, lastModifiedAt: Date() };
        }
        return content;
      });
    });

    const openIssuesContent = contents.filter(({ closed }) => closed === false);
    const closedIssuesContent = contents.filter(({ closed }) => closed === true);

    issueTable.openIssues = openIssuesContent;
    issueTable.closedIssues = closedIssuesContent;

    return res(ctx.status(204));
  }),

  // 이슈 코멘트 등록
  rest.post('api/issues/:issueId/comments', async (req, res, ctx) => {
    const { issueId } = req.params;
    const memberId = req.url.searchParams.get('memberId');

    const issue = findIssue(Number(issueId));

    if (!issue) {
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }

    const { content } = await req.json();

    const newCommentId = addCommentsId();
    const author = userTable.find(({ id }) => id === Number(memberId))!;

    const newComment: CommentsTypes = {
      id: newCommentId,
      author,
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
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
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
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
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
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }

    const newReactionId = addReactionsId();
    const { unicode } = REACTIONS.find((e) => emojiName === e.name)!;
    const newReactor = { id: memberId, nickname: userTable.find(({ id }) => id === memberId)?.nickname! };

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
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
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
  rest.post('api/issues?member', async (req, res, ctx) => {
    const requestData = await req.json();
    const userId = req.url.searchParams.get('memberId');
    const { title } = requestData;

    const findAuthor = (memberId: string) => USER_LIST.find((el) => el.id === Number(memberId));

    if (!title) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    if (!findAuthor(userId!)) {
      return res(ctx.status(400), ctx.json('유효하지 않은 요청입니다.'));
    }

    const newIssue = responseNewIssueData({ memberId: userId, ...requestData });
    issueTable.openIssues.push(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),
];
