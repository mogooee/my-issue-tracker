import { rest } from 'msw';

const userTable: any = [];
const userInfo = {
  email: 'hoo@gmail.com',
  profileImage: 'string',
};

const message = {
  message: '뭔가 잘못됨',
};

export const handlers = [
  // 유저 정보
  rest.get('api/auth/:provider', (req, res, ctx) => {
    const { provider } = req.params;
    // const code = req.url.searchParams.get('code');

    if (provider === 'GITHUB') {
      return res(ctx.status(200), ctx.json((userInfo.email = 'hoo@github.com')));
    }

    if (provider === 'NAVER') {
      return res(ctx.status(200), ctx.json((userInfo.email = 'hoo@naver.com')));
    }

    if (provider === 'KAKAO') {
      return res(ctx.status(200), ctx.json((userInfo.email = 'hoo@daum.net')));
    }

    return res(ctx.status(400), ctx.json(message));
  }),

  // 유저 추가
  rest.post('members/new/auth', async (req, res, ctx) => {
    const newMember = await req.json();
    userTable.push(newMember);

    const response = {
      id: 0,
      email: newMember.email,
      nickname: newMember.nickname,
      profileImage: newMember.profileImage,
    };

    return res(ctx.status(201), ctx.json(response));
  }),
];
