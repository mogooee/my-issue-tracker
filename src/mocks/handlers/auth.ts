// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { OAuthResponse, RedirectAuthTypes } from '@/api/sign';
import { UserTypes } from '@/api/issue/types';
import { CustomErrorCode, makeErrRes } from '@/api/constants';

import { USER_LIST as OAUTH_USER_LIST } from '@/components/Molecules/Dropdown/mock';
import AppLogo from '@/assets/logo/issueTracker.png';

import { filterIdPassword, getCookie, deleteAllCookies } from '@/mocks/helpers/authHelpers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/mocks/constants';

interface GeneralUserInfoTypes {
  loginId?: string;
  password?: string;
}

export type UserTableTypes = GeneralUserInfoTypes & UserTypes;

export const USER_TABLE: UserTableTypes[] = [
  ...OAUTH_USER_LIST,
  {
    id: OAUTH_USER_LIST.length,
    loginId: 'WebTest',
    password: 'test1234',
    email: 'WebTest@test.com',
    nickname: 'WebTest',
    profileImage: AppLogo,
  },
];

export const TEST_USER = USER_TABLE.find((user) => user.nickname === 'WebTest') || USER_TABLE[0];

export const authHandlers = [
  // silent-refresh
  rest.get('api/auth/reissue', (req, res, ctx) => {
    // Access 토큰은 만료됐지만 refresh 토큰은 유효한 경우
    if (!getCookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE) && getCookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE)) {
      return res(ctx.status(200), ctx.cookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE));
    }

    // Refresh 토큰이 존재하지 않거나 유효하지 않은 경우
    if (
      getCookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE) !== REFRESH_TOKEN.VALUE ||
      !getCookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE)
    ) {
      return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.INVALID_REFRESH_TOKEN)));
    }

    return res(
      ctx.status(200),
      ctx.cookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE),
      ctx.cookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE),
    );
  }),

  // 일반 로그인
  rest.post('api/members/signin', async (req, res, ctx) => {
    const loginInfo = await req.json();

    const findUser = USER_TABLE.find((user) => user.loginId === loginInfo.id);

    if (!findUser) return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.SIGN_IN_FAIL)));

    if (findUser.password === loginInfo.password) {
      const response: OAuthResponse = {
        memberResponse: {
          email: findUser.email,
          id: findUser.id,
          profileImage: findUser.profileImage,
          nickname: findUser.nickname,
        },
        accessToken: {
          token: ACCESS_TOKEN.VALUE,
        },
      };

      // 새로고침을 해도 저장된 유저의 정보를 불러올수있다.
      sessionStorage.setItem('user', JSON.stringify(findUser));

      return res(
        ctx.status(200),
        ctx.json(response),
        ctx.cookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE),
        ctx.cookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE),
      );
    }

    return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.SIGN_IN_FAIL)));
  }),

  // 유저 정보 요청 API
  rest.get('api/members/info', (req, res, ctx) => {
    // sessionStorage에 유저가 있는지 확인한다.
    const getSessionStorgeUserInfo = sessionStorage.getItem('user');
    if (getSessionStorgeUserInfo) {
      const parserUserInfo = JSON.parse(getSessionStorgeUserInfo) as UserTableTypes;
      const findUser = USER_TABLE.find((user) => user.nickname === parserUserInfo.nickname);

      // 유저테이블에 없는 유저면 테이블에 추가한다.
      if (!findUser) {
        USER_TABLE.push(parserUserInfo);
      }
      return res(ctx.status(200), ctx.json(parserUserInfo));
    }

    return res(ctx.status(200), ctx.json(TEST_USER));
  }),

  // 유저 정보
  rest.get('api/auth/:provider', (req, res, ctx) => {
    const { provider } = req.params;

    // 사이트에 유저정보를 요청하면 OAuth 정보 - 깃허브에서 오는 정보 (signUpData)
    const OAuthInfo = {
      loginId: 'dobby',
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
          resourceOwnerId: OAuthInfo.loginId,
          email: OAuthInfo.email,
          profileImage: OAuthInfo.profileImage,
        };
      }

      return res(ctx.status(200), ctx.json(response));
    }

    return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.INVALID_AUTH_PROVIDER_TYPE)));
  }),

  // 일반 회원 가입
  rest.post('api/members/new/general', async (req, res, ctx) => {
    const formData = await req.json();
    const { signInId, password, email, nickname } = formData;

    if (!signInId || !password || !email || !nickname) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    const newMemberInfo: UserTableTypes = {
      id: USER_TABLE.length,
      loginId: signInId,
      password,
      email,
      nickname,
      profileImage: AppLogo,
    };

    USER_TABLE.push(newMemberInfo);

    // 새로고침을 해도 저장된 유저의 정보를 불러올수있다.
    sessionStorage.setItem('user', JSON.stringify(newMemberInfo));

    const { loginId, password: newMemberPassword, ...response } = newMemberInfo;

    return res(ctx.status(200), ctx.json(response));
  }),

  // Oauth 회원 가입
  rest.post('api/members/new/auth', async (req, res, ctx) => {
    const newMember = await req.json();
    const { email, nickname } = newMember;

    if (!email || !nickname) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    const findEmail = USER_TABLE.find((user) => user.email === email);

    if (findEmail) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.DUPLICATED_EMAIL)));
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
        token: ACCESS_TOKEN.VALUE,
      },
    };

    return res(
      ctx.status(201),
      ctx.json(response),
      ctx.cookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE),
      ctx.cookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE),
    );
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
  rest.post('api/members/signout', (req, res, ctx) => {
    deleteAllCookies();
    return res(ctx.status(200));
  }),

  // 모든 유저 정보 불러오기
  rest.get('api/members', (req, res, ctx) => {
    const FILTERED_USER_LIST = USER_TABLE.map((user) => filterIdPassword(user));
    // Access 토큰은 만료됐지만 refresh 토큰은 유효한 경우
    if (!getCookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE) && getCookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE)) {
      return res(ctx.status(200), ctx.cookie(ACCESS_TOKEN.KEY, ACCESS_TOKEN.VALUE));
    }

    // Refresh 토큰이 존재하지 않거나 유효하지 않은 경우
    if (
      getCookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE) !== REFRESH_TOKEN.VALUE ||
      !getCookie(REFRESH_TOKEN.KEY, REFRESH_TOKEN.VALUE)
    ) {
      return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.INVALID_REFRESH_TOKEN)));
    }

    return res(ctx.status(200), ctx.json(FILTERED_USER_LIST));
  }),
];
