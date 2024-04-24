/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { OAuthResponse, RedirectAuthTypes } from '@/api/sign';
import { UserTypes } from '@/api/issue/types';
import { CustomErrorCode, makeErrRes } from '@/api/constants';

import { USER_LIST as OAUTH_USER_LIST } from '@/components/Molecules/Dropdown/mock';
import AppLogo from '@/assets/logo/issueTracker.png';

import { filterIdPassword, getCookie, deleteCookie } from '@/mocks/helpers/authHelpers';
import { decodeJwt, getAccessToken, getRefreshToken } from '../issueTokens';
import { REFRESH_TOKEN } from '../constants';

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
  rest.get('api/auth/reissue', async (req, res, ctx) => {
    // Access 토큰은 만료됐지만 refresh 토큰은 유효한 경우
    const refreshToken = getCookie(REFRESH_TOKEN.KEY);
    if (refreshToken) {
      // refresh Token을 디코딩해서 payload에 id를 찾고 userTable에 있으면 accessToken 새로 발급
      const jwtId = Number(decodeJwt(refreshToken).userId);
      const isMember = USER_TABLE.find((user) => user.id === jwtId);
      if (isMember) {
        const accessToken = await getAccessToken({ userId: jwtId });

        const response = {
          signInMember: isMember,
          accessToken: {
            token: accessToken,
          },
        };

        return res(ctx.status(200), ctx.json(response));
      }
    }

    return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.INVALID_REFRESH_TOKEN)));
  }),

  // 일반 로그인
  rest.post('api/members/signin', async (req, res, ctx) => {
    const loginInfo = await req.json();

    const findUser = USER_TABLE.find((user) => user.loginId === loginInfo.id);

    if (!findUser) return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.SIGN_IN_FAIL)));

    const accessToken = await getAccessToken({ userId: findUser.id });
    const refreshToken = await getRefreshToken({ userId: findUser.id });

    if (findUser.password === loginInfo.password) {
      const response: OAuthResponse = {
        memberResponse: {
          email: findUser.email,
          id: findUser.id,
          profileImage: findUser.profileImage,
          nickname: findUser.nickname,
        },
        accessToken: {
          token: accessToken,
        },
      };

      return res(ctx.status(200), ctx.json(response), ctx.cookie(REFRESH_TOKEN.KEY, refreshToken));
    }

    return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.SIGN_IN_FAIL)));
  }),

  // 유저 정보 요청 API
  rest.get('api/members/info', (req, res, ctx) => {
    // 전달된 jwt 토큰 복호화해서 payload의 userId로 유저 찾기
    const accessToken = req.headers.get('authorization')?.replace('Bearear ', '');
    if (accessToken) {
      const jwtId = decodeJwt(accessToken).userId;
      const findUser = USER_TABLE.find((user) => user.id === jwtId);

      if (findUser) {
        return res(ctx.status(200), ctx.json(findUser));
      }
    }

    return res(ctx.status(401), ctx.json(makeErrRes(CustomErrorCode.INVALID_AUTHOR)));
  }),

  // oauth 로그인/회원가입
  rest.get('api/auth/:provider', async (req, res, ctx) => {
    const { provider } = req.params;

    // 인가 코드로 서드 파티 Authorization server에 access token 요청
    const AUTHORIZE_CODE = req.url.searchParams.get('code');

    const kakaoOAuth = 'https://kauth.kakao.com/oauth/token';

    const tokenResponse = await ctx.fetch(kakaoOAuth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8"',
      },
      body: encodeURI(
        Object.entries({
          grant_type: 'authorization_code',
          client_id: '46649127c2ff32b41c517279f9791033',
          redirect_uri: 'http://localhost:3000/redirect-auth?provider=kakao',
          code: AUTHORIZE_CODE,
          client_secret: 'O9o0lOEHOVed0SqA2AUHUJS1bBHzsIPU',
        })
          .map(([key, value]) => `${key}=${value}`)
          .join('&'),
      ),
    });

    const token = await tokenResponse.json();

    // 발급받은 access token으로 서드 파티 Resource server에 리소스 요청
    const authResponse = await ctx.fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8"',
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const { id, kakao_account } = await authResponse.json();

    // 사이트에 요청한 유저 정보
    const OAuthInfo = {
      loginId: id,
      email: kakao_account.has_email ? kakao_account.email : '',
      nickname: kakao_account.profile.nickname,
      profileImage: kakao_account.profile.profile_image_url,
    };

    const response: RedirectAuthTypes = {
      signUpFormData: null,
      signInMember: null,
      accessToken: null,
    };

    if (provider === 'github' || provider === 'naver' || provider === 'kakao') {
      const member = USER_TABLE.find((user) => user.email === OAuthInfo.email);

      // 회원인 유저 -> 로그인 처리 후 홈 화면
      if (member) {
        response.signInMember = { ...OAuthInfo, id: member.id };
        const accessToken = await getAccessToken({ userId: member.id });
        response.accessToken = { token: accessToken };
      } else {
        // 회원이 아닌 유저 -> 회원가입 화면
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

    const { loginId, password: newMemberPassword, ...response } = newMemberInfo;

    return res(ctx.status(200), ctx.json(response));
  }),

  // Oauth 회원 가입
  rest.post('api/members/new/auth', async (req, res, ctx) => {
    const reqMember = await req.json();
    const { email, nickname } = reqMember;

    if (!email || !nickname) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    const findEmail = USER_TABLE.find((user) => user.email === email);

    if (findEmail) {
      return res(ctx.status(400), ctx.json(makeErrRes(CustomErrorCode.DUPLICATED_EMAIL)));
    }

    const newMember = {
      id: USER_TABLE.length + 1,
      ...reqMember,
    };

    USER_TABLE.push(newMember);

    const accessToken = await getAccessToken({ userId: newMember.id });
    const refreshToken = await getRefreshToken({ userId: newMember.id });

    const response = {
      memberResponse: newMember,
      accessToken: {
        token: accessToken,
      },
    };

    return res(ctx.status(201), ctx.json(response), ctx.cookie(REFRESH_TOKEN.KEY, refreshToken));
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
    deleteCookie(REFRESH_TOKEN.KEY);
    return res(ctx.status(200));
  }),

  // 모든 유저 정보 불러오기
  rest.get('api/members', (req, res, ctx) => {
    const FILTERED_USER_LIST = USER_TABLE.map((user) => filterIdPassword(user));
    return res(ctx.status(200), ctx.json(FILTERED_USER_LIST));
  }),
];
