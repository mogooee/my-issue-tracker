import axios, { AxiosError } from 'axios';

export interface OAuthNewMemberTypes {
  email: string;
  nickname: string;
  profileImage: string | null;
  authProviderType: 'GITHUB' | 'NAVER' | 'KAKAO';
  resourceOwnerId: string;
}

export interface GeneralNewMemberTypes {
  loginId: string;
  password: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export interface OAuthResponse {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  accessToken?: string;
}

export type Response = Omit<OAuthResponse, 'accessToken'>;

export const postSignUpData = async ({
  formData,
  type,
}: {
  formData: OAuthNewMemberTypes | GeneralNewMemberTypes;
  type: 'general' | 'auth';
}) => {
  try {
    const { data } = await axios.post<OAuthResponse | Response>(`api/members/new/${type}`, formData);
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

export const getDuplicatesResult = async (router: string, value: string) => {
  try {
    const { data } = await axios.get(`api/members/${router}/${value}/exists`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
