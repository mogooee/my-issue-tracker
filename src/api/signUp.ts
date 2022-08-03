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

export const postSignUpData = async ({
  formData,
  type,
}: {
  formData: OAuthNewMemberTypes | GeneralNewMemberTypes;
  type: 'general' | 'auth';
}) => {
  try {
    const { data } = await axios.post<OAuthNewMemberTypes | GeneralNewMemberTypes>(
      `api/members/new/${type}`,
      formData,
      { withCredentials: true },
    );

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
