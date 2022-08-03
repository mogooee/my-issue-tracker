import { rest } from 'msw';
import { RedirectAuthTypes, SignInMemberTypes } from '@/api/redirectAuth';

const userTable: SignInMemberTypes[] = [
  {
    id: 1,
    email: 'dobby@gmail.com',
    nickname: '도비',
    profileImage: 'string',
  },
];

const message = {
  message: '뭔가 잘못됨',
};

export const handlers = [
  // 유저 정보
  rest.get('api/auth/:provider', (req, res, ctx) => {
    const { provider } = req.params;
    const code = req.url.searchParams.get('code');

    // 사이트에 유저정보를 요청하면 OAuth 정보 - 회원DB
    const OAuthInfo = {
      id: 'dobby',
      email: 'dobby@gmail.co',
      nickname: '도비',
      profileImage: 'string',
    };

    const response: RedirectAuthTypes = {
      signUpFormData: null,
      signInMember: null,
    };

    if (provider === 'GITHUB' || provider === 'NAVER' || provider === 'KAKAO') {
      const member = userTable.find((el) => el.email === OAuthInfo.email);

      if (member) {
        response.signInMember = { ...OAuthInfo, id: member.id };
      } else {
        response.signUpFormData = {
          resourceOwnerId: OAuthInfo.id,
          email: OAuthInfo.email,
          profileImage: OAuthInfo.profileImage,
        };
      }

      return res(ctx.status(200), ctx.json(response));
    }

    return res(ctx.status(400), ctx.json(message));
  }),

  // 일반 회원 가입
  rest.post('api/members/new/general', async (req, res, ctx) => {
    const newMember = await req.json();
    const { loginId, password, email, nickname } = newMember;

    if (!loginId || !password || !email || !nickname) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    userTable.push(newMember);

    const response = {
      id: 0,
      email: newMember.email,
      nickname: newMember.nickname,
      profileImage: newMember.profileImage,
    };

    return res(ctx.status(201), ctx.json(response));
  }),

  // Oauth 회원 가입
  rest.post('api/members/new/auth', async (req, res, ctx) => {
    const newMember = await req.json();
    const { email, nickname } = newMember;

    if (!email || !nickname) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

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
  rest.get('api/members/login-id/:id/exists', (req, res, ctx) => {
    const { id } = req.params;

    // dobby123라는 유저가 이미 있는 경우
    if (id === 'dobby123') {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 유저 닉네임 중복 검사
  rest.get('api/members/nickname/:nickname/exists', (req, res, ctx) => {
    const { nickname } = req.params;

    // 도비라는 유저가 이미 있는 경우
    if (nickname === '도비123') {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 유저 이메일 중복 검사
  rest.get('api/members/email/:email/exists', (req, res, ctx) => {
    const { email } = req.params;

    // 도비라는 유저가 이미 있는 경우
    if (email === 'dobby123@gmail.com') {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),
];
