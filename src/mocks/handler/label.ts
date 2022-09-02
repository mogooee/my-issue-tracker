// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const message = {
  message: '',
};

let labelTable = [
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

export const labelHandlers = [
  // 라벨 리스트 조회
  rest.get('api/labels', (req, res, ctx) => res(ctx.status(200), ctx.json(labelTable))),

  // 라벨 등록
  rest.post('api/labels', async (req, res, ctx) => {
    const newLabel = await req.json();
    const { title, backgroundColorCode, textColor } = newLabel;

    if (title && backgroundColorCode && textColor) {
      labelTable.push(newLabel);
      return res(ctx.status(200), ctx.json(newLabel));
    }

    return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
  }),

  // 라벨 상세 조회
  rest.get('api/labels/:id', (req, res, ctx) => {
    const { id } = req.params;
    const result = labelTable.find((e) => e.id === Number(id));

    if (!result) {
      message.message = '해당하는 라벨 데이터가 없습니다.';
      return res(ctx.status(400), ctx.json(message));
    }
    return res(ctx.status(200), ctx.json(result));
  }),

  // 라벨 삭제
  rest.delete('api/labels/:id', (req, res, ctx) => {
    const { id } = req.params;

    const result = labelTable.find((e) => e.id === Number(id));
    if (!result) {
      message.message = '라벨 삭제 실패';
      return res(ctx.status(400), ctx.json(message));
    }

    labelTable = labelTable.filter((e) => e.id !== Number(id));
    message.message = '라벨 삭제 성공';
    return res(ctx.status(200), ctx.json(message));
  }),

  // 라벨 수정
  rest.patch('api/labels/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const newLabel = await req.json();

    const result = labelTable.find((e) => e.id === Number(id));

    if (!result) {
      message.message = '라벨 수정 실패';
      return res(ctx.status(400), ctx.json(message));
    }

    labelTable = labelTable.map((e) => {
      if (e.id === Number(id)) {
        return newLabel;
      }
      return e;
    });
    return res(ctx.status(200), ctx.json(newLabel));
  }),
];
