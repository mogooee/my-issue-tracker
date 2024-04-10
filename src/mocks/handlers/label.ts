// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { ContentTypes, LabelTypes } from '@/api/issue/types';
import { issueTable } from '@/mocks/tables/issue';
import { CustomErrorCode, makeErrRes } from '@/api/constants';

// eslint-disable-next-line import/no-mutable-exports
export let LABEL_TABLE: LabelTypes[] = [
  {
    id: 1,
    title: 'Feature',
    backgroundColorCode: '#d4c5f9',
    description: '기능 개발용 라벨입니다.',
    textColor: 'BLACK',
  },
  {
    id: 2,
    title: 'Docs',
    backgroundColorCode: '#d4c510',
    description: '문서 추가용 라벨입니다.',
    textColor: 'WHITE',
  },
  {
    id: 3,
    title: 'Bugs',
    backgroundColorCode: '#d4c505',
    description: '버그 수정용 라벨입니다.',
    textColor: 'BLACK',
  },
  {
    id: 4,
    title: 'Question',
    backgroundColorCode: '#d4c501',
    description: '질문용 라벨입니다.',
    textColor: 'WHITE',
  },
];

const addIdCount = () => {
  let count = LABEL_TABLE.length;

  return () => {
    count += 1;
    return count;
  };
};

const countId = addIdCount();

const findLabelHelper = (id: number) => LABEL_TABLE.find((e) => e.id === id);

export const labelHandlers = [
  // 라벨 리스트 조회
  rest.get('api/labels', (req, res, ctx) => res(ctx.status(200), ctx.json(LABEL_TABLE))),

  // 라벨 등록
  rest.post('api/labels', async (req, res, ctx) => {
    const newLabel = await req.json();
    const { title, backgroundColorCode, textColor, description } = newLabel;

    const findLabelTitle = LABEL_TABLE.find((label) => label.title === title);

    if (findLabelTitle) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.DUPLICATED_LABEL_TITLE)));
    }

    if (title && backgroundColorCode && textColor) {
      const id = countId();
      LABEL_TABLE.push({ ...newLabel, description, id });
      return res(ctx.status(200), ctx.json(newLabel));
    }

    return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
  }),

  // 라벨 상세 조회
  rest.get('api/labels/:id', (req, res, ctx) => {
    const { id } = req.params;
    const findLabel = findLabelHelper(Number(id));

    if (!findLabel) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_LABEL)));
    }
    return res(ctx.status(200), ctx.json(findLabel));
  }),

  // 라벨 삭제
  rest.delete('api/labels/:id', (req, res, ctx) => {
    const { id } = req.params;
    const findLabel = findLabelHelper(Number(id));

    if (!findLabel) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_LABEL)));
    }

    LABEL_TABLE = LABEL_TABLE.filter((e) => e.id !== Number(id));

    const updatedIssues = (state: 'openIssues' | 'closedIssues'): ContentTypes[] =>
      issueTable[state].map((issue) => ({
        ...issue,
        issueLabels: {
          issueLabels: issue.issueLabels.issueLabels.filter((issueLabel) => issueLabel.id !== Number(id)),
        },
      }));

    issueTable.openIssues = updatedIssues('openIssues');
    issueTable.closedIssues = updatedIssues('closedIssues');

    return res(ctx.status(200));
  }),

  // 라벨 수정
  rest.patch('api/labels/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const newLabel = await req.json();
    const findLabel = findLabelHelper(Number(id));

    if (!findLabel) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.NOT_EXISTS_LABEL)));
    }

    LABEL_TABLE = LABEL_TABLE.map((e) => {
      if (e.id === Number(id)) {
        return newLabel;
      }
      return e;
    });

    const updatedIssues = (state: 'openIssues' | 'closedIssues'): ContentTypes[] =>
      issueTable[state].map((issue) => ({
        ...issue,
        issueLabels: {
          issueLabels: issue.issueLabels.issueLabels.map((issueLabel) => {
            if (issueLabel.id === Number(id)) return newLabel;
            return issueLabel;
          }),
        },
      }));

    issueTable.openIssues = updatedIssues('openIssues');
    issueTable.closedIssues = updatedIssues('closedIssues');

    return res(ctx.status(200), ctx.json(newLabel));
  }),
];
