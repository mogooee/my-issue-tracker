// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { RedirectAuthTypes, SignInMemberTypes } from '@/api/redirectAuth';

const userTable: SignInMemberTypes[] = [
  {
    id: 123456789,
    email: 'dobby@gmail.com',
    nickname: '도비',
    profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
  },
];

const message = {
  message: '뭔가 잘못됨',
};

export const authHandlers = [
  // silent-refresh
  rest.get('api/auth/reissue', (req, res, ctx) => {
    const response = {
      accessToken: 'access123',
    };

    return res(ctx.status(200), ctx.json(response), ctx.cookie('refresh-token', 'refresh123'));
  }),

  // 로그인 검사 테스트용 API
  rest.get('api/auth/test', (req, res, ctx) => res(ctx.status(200))),

  // 유저 정보 요청 API
  rest.get('api/members/info', (req, res, ctx) => {
    const userInfo = {
      id: '123456789',
      email: 'dobby@gmail.com',
      nickname: '도비',
      profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
    };
    return res(ctx.status(200), ctx.json(userInfo));
  }),

  // 유저 정보
  rest.get('api/auth/:provider', (req, res, ctx) => {
    const { provider } = req.params;

    // 사이트에 유저정보를 요청하면 OAuth 정보 - 깃허브에서 오는 정보 (signUpData)
    const OAuthInfo = {
      id: 'dobby',
      email: 'dobby@gmail.com',
      nickname: '도비',
      profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
    };

    const response: RedirectAuthTypes = {
      signUpFormData: {
        resourceOwnerId: 'string',
        email: 'hoo@gmail.com',
        profileImage: 'string',
      },
      signInMember: null,
      accessToken: {
        token: 'token',
      },
    };

    if (provider === 'github' || provider === 'naver' || provider === 'kakao') {
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
    const { signInId, password, email, nickname } = newMember;

    if (!signInId || !password || !email || !nickname) {
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
      accessToken: 'access123',
    };

    return res(ctx.status(201), ctx.json(response), ctx.cookie('refresh-token', 'refresh123'));
  }),

  // 유저 아이디 중복 검사
  rest.get('api/members/signin-id/:id/exists', (req, res, ctx) => {
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

  // 로그아웃
  rest.head('api/members/signout', (req, res, ctx) => res(ctx.status(200))),
];
