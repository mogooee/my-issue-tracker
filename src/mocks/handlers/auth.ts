// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { RedirectAuthTypes } from '@/api/sign';
import { USER_LIST as OAUTH_USER_LIST } from '@/components/Molecules/Dropdown/mock';
import { UserTypes } from '@/api/issue/types';

interface GeneralUserInfoTypes {
  loginId?: string;
  password?: string;
}

type UserTableTypes = GeneralUserInfoTypes & UserTypes;

export const USER_TABLE: UserTableTypes[] = [
  ...OAUTH_USER_LIST,
  {
    id: OAUTH_USER_LIST.length + 1,
    loginId: 'WebTest',
    password: 'test1234',
    email: 'WebTest@test.com',
    nickname: 'WebTest',
    profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
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

    return res(ctx.status(200), ctx.json(response), ctx.cookie('refresh_token', 'refresh123'));
  }),

  // 로그인 검사 테스트용 API
  rest.get('api/auth/test', (req, res, ctx) => res(ctx.status(200))),

  // 유저 정보 요청 API
  rest.get('api/members/info', (req, res, ctx) => {
    const userInfo = {
      id: 0,
      email: 'dobby@gmail.com',
      nickname: '도비',
      profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
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
      profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
    };

    const response: RedirectAuthTypes = {
      signUpFormData: null,
      signInMember: null,
      accessToken: {
        token: 'token',
      },
    };

    if (provider === 'github' || provider === 'naver' || provider === 'kakao') {
      const member = USER_TABLE.find((user) => user.email === OAuthInfo.email);

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

    USER_TABLE.push(newMember);

    const response = {
      memberResponse: {
        id: USER_TABLE.length + 1,
        email: newMember.email,
        nickname: newMember.nickname,
        profileImage: newMember.profileImage,
      },
      accessToken: {
        token: 'access123',
      },
    };

    return res(ctx.status(201), ctx.json(response), ctx.cookie('refresh_token', 'refresh123'));
  }),

  // 유저 아이디 중복 검사
  rest.get('api/members/signin-id/:id/exists', (req, res, ctx) => {
    const { id } = req.params;
    const findUserId = USER_TABLE.find((user) => user.loginId === id);

    // dobby123라는 유저가 이미 있는 경우
    if (findUserId) {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 유저 닉네임 중복 검사
  rest.get('api/members/nickname/:nickname/exists', (req, res, ctx) => {
    const { nickname } = req.params;
    const findUserNickname = USER_TABLE.find((user) => user.loginId === nickname);

    if (findUserNickname) {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 유저 이메일 중복 검사
  rest.get('api/members/email/:email/exists', (req, res, ctx) => {
    const { email } = req.params;
    const findUserEmail = USER_TABLE.find((user) => user.loginId === email);

    if (findUserEmail) {
      return res(ctx.status(200), ctx.json(true));
    }

    return res(ctx.status(200), ctx.json(false));
  }),

  // 로그아웃
  rest.post('api/members/signout', (req, res, ctx) => res(ctx.status(200))),

  // 모든 유저 정보 불러오기
  rest.get('api/members', (req, res, ctx) => res(ctx.status(200), ctx.json(USER_TABLE))),
];
