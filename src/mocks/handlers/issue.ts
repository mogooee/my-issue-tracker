// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { issues } from '@/mocks/tables/issue';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';

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
          return { ...content, closed: !status, lastModifiedAt: Date() };
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

  // 이모티콘 전체 조회
  rest.get('api/issues/comments/reactions/emojis', (req, res, ctx) => res(ctx.status(200), ctx.json(REACTIONS))),
];
