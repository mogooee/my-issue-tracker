// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { issues } from '@/mocks/tables/issue';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';
import { CommentsTypes, ContentTypes, ReactionResponseTypes } from '@/api/issue/types';
import { userTable } from '@/mocks/handlers/auth';

const message = {
  message: '',
};

let issueTable = issues;

const findIssue = (issueId: number) => {
  const { openIssues, closedIssues } = issueTable;
  const contents = [...openIssues.content, ...closedIssues.content];

  const issue = contents.find((e) => e.id === Number(issueId));
  return issue;
};

const updateIssueTable = (newIssue: ContentTypes) => {
  let replacedIssuesContent = newIssue.closed ? issueTable.closedIssues.content : issueTable.openIssues.content;

  replacedIssuesContent = replacedIssuesContent.map((content) => {
    if (content.id === newIssue.id) return newIssue;
    return content;
  });

  if (newIssue.closed)
    issueTable = { ...issueTable, closedIssues: { ...issueTable.closedIssues, content: replacedIssuesContent } };
  else issueTable = { ...issueTable, openIssues: { ...issueTable.openIssues, content: replacedIssuesContent } };
};

const addIdCount = (type: 'comments' | 'reactions') => {
  const contents = [...issueTable.openIssues.content, ...issueTable.closedIssues.content];

  let commentsCount = contents.reduce((acc, cur) => acc + cur.comments.length, 0);

  let reactionsCount: number = contents.reduce(
    (accContentReactions, { comments }) =>
      accContentReactions +
      comments.reduce(
        (accCommentReactions, { issueCommentReactionsResponse }) =>
          accCommentReactions + issueCommentReactionsResponse.length,
        0,
      ),
    0,
  );

  return () => {
    if (type === 'comments') {
      commentsCount += 1;
      return commentsCount;
    }

    reactionsCount += 1;
    return reactionsCount;
  };
};

const addCommentsId = addIdCount('comments');
const addReactionsId = addIdCount('reactions');

export const issueHandlers = [
  // 이슈 전체 조회
  rest.get('api/issues', (req, res, ctx) => res(ctx.status(200), ctx.json(issueTable))),

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
    let contents = [...openIssues.content, ...closedIssues.content];

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

    issueTable = {
      ...issueTable,
      openIssues: { ...openIssues, content: openIssuesContent },
      openIssueCount: openIssuesContent.length,
      closedIssues: { ...closedIssues, content: closedIssuesContent },
      closedIssueCount: closedIssuesContent.length,
    };

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
];
