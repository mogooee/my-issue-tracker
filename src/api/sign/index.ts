import { UserTypes } from '@/api/issue/types';
import axios, { AxiosError } from 'axios';

export interface SigninTypes {
  id: string;
  password: string;
}

interface ErrorMessage {
  message: string;
}

export interface TokenType {
  token: string;
}

export interface OAuthResponse {
  memberResponse: UserTypes;
  accessToken?: TokenType;
}

export interface OAuthNewMemberTypes {
  email: string;
  nickname: string;
  profileImage: string | null;
  authProviderType: 'GITHUB' | 'NAVER' | 'KAKAO';
  resourceOwnerId: string;
}

export interface GeneralNewMemberTypes {
  signInId: string;
  password: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export interface SignUpFormDataTypes {
  resourceOwnerId: string;
  email: string;
  profileImage: string;
}

export interface RedirectAuthTypes {
  signUpFormData: SignUpFormDataTypes | null;
  signInMember: UserTypes | null;
  accessToken: TokenType | null;
}

// 로그인 유지 관련
export const silentRefresh = async () => {
  try {
    const { data } = await axios.get('api/auth/reissue');
    const { accessToken } = data;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken.token}`;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    // throw err;
  }
};

export const getUserInfo = async () => {
  try {
    const { data } = await axios.get('api/members/info');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

// 로그인 로그아웃 관련
export const signin = async (formData: SigninTypes) => {
  try {
    const { data } = await axios.post<OAuthResponse>('api/members/signin', formData);
    return data;
  } catch (error) {
    const err = error as AxiosError<ErrorMessage>;
    // throw err;
  }
};

export const signout = async () => {
  try {
    await axios.head('api/members/signout');
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('Authentication');
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

// 회원가입 관련
export const getRedirectAuthData = async (provider: string, code: string): Promise<RedirectAuthTypes> => {
  try {
    const { data } = await axios.get<RedirectAuthTypes>(`api/auth/${provider}?code=${code}`);

    if (data.accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken.token}`;
    }

    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const signup = async ({
  formData,
  type,
}: {
  formData: OAuthNewMemberTypes | GeneralNewMemberTypes;
  type: 'general' | 'auth';
}) => {
  try {
    const { data } = await axios.post<OAuthResponse | UserTypes>(`api/members/new/${type}`, formData);
    if (type === 'auth') {
      const { accessToken } = data as OAuthResponse;
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
