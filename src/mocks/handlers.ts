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

  // 유저 아이디 중복 검사
  rest.get('members/login-id/:id/exists', (req, res, ctx) => {
    const { id } = req.params;

    // dobby123라는 유저가 이미 있는 경우
    if (id === 'dobby123') {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 유저 닉네임 중복 검사
  rest.get('members/nickname/:nickname/exists', (req, res, ctx) => {
    const { nickname } = req.params;

    // 도비라는 유저가 이미 있는 경우
    if (nickname === '도비123') {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 유저 이메일 중복 검사
  rest.get('members/email/:email/exists', (req, res, ctx) => {
    const { email } = req.params;

    // 도비라는 유저가 이미 있는 경우
    if (email === 'dobby123@gmail.com') {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),
];
