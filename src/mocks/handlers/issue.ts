// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { issues } from '@/mocks/tables/issue';
import { REACTIONS } from '@/components/Molecules/Dropdown/Panel/Reaction/mock';
import { USER_LIST } from '@/components/Molecules/Dropdown/mock';
import { responseNewIssueData } from '@/mocks/tables/newIssueHelper';

const message = {
  message: '',
};

export const issueHandlers = [
  // 이슈 전체 조회
  rest.get('api/issues', (req, res, ctx) => res(ctx.status(200), ctx.json(issues))),

  // 이슈 단건 조회
  rest.get('api/issues/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { openIssues, closedIssues } = issues;
    const contents = [...openIssues.content, ...closedIssues.content];
    const issue = contents.find((e) => e.id === Number(id));

    if (!issue) {
      message.message = '해당하는 이슈 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }
    return res(ctx.status(200), ctx.json(issue));
  }),

  // 이모티콘 전체 조회
  rest.get('api/issues/comments/reactions/emojis', (req, res, ctx) => res(ctx.status(200), ctx.json(REACTIONS))),

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
    issues.openIssues.content.push(newIssue);

    return res(ctx.status(200), ctx.json(newIssue));
  }),
];
