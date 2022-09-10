// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { issues } from '@/mocks/tables/issue';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';

const message = {
  message: '',
};

let issueTable = issues;

export const issueHandlers = [
  // 이슈 전체 조회
  rest.get('api/issues', (req, res, ctx) => res(ctx.status(200), ctx.json(issueTable))),

  // 이슈 단건 조회
  rest.get('api/issues/:issueId', (req, res, ctx) => {
    const { issueId } = req.params;
    const { openIssues, closedIssues } = issueTable;
    const contents = [...openIssues.content, ...closedIssues.content];
    const issue = contents.find((e) => e.id === Number(issueId));

    if (!issue) {
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }
    return res(ctx.status(200), ctx.json(issue));
  }),

  // 이슈 제목 수정
  rest.patch('api/issues/:id/title', async (req, res, ctx) => {
    const { id } = req.params;
    const { openIssues, closedIssues } = issueTable;
    const contents = [...openIssues.content, ...closedIssues.content];
    const issue = contents.find((e) => e.id === Number(id));

    if (!issue) {
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }

    const { title: newTitle } = await req.json();

    const newIssue = { ...issue, title: newTitle };

    let replacedContent = issue.closed ? issues.closedIssues.content : issues.openIssues.content;
    replacedContent = replacedContent.map((content) => {
      if (content.id === Number(id)) return newIssue;
      return content;
    });

    if (issue.closed) issueTable = { ...issueTable, closedIssues: { ...closedIssues, content: replacedContent } };
    else issueTable = { ...issueTable, openIssues: { ...openIssues, content: replacedContent } };

    return res(ctx.status(200), ctx.json(newIssue));
  }),

  }),

  // 이모티콘 전체 조회
  rest.get('api/issues/comments/reactions/emojis', (req, res, ctx) => res(ctx.status(200), ctx.json(REACTIONS))),
];
