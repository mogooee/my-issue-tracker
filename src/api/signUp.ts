import axios, { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';

export interface OAuthNewMemberTypes {
  email: string;
  nickname: string;
  profileImage: string | null;
  authProviderType: 'GITHUB' | 'NAVER' | 'KAKAO';
}

export interface GeneralNewMemberTypes {
  loginId: string;
  password: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export const clickSignUpButtonHandler = async ({
  formData,
  type,
  navigate,
}: {
  formData: OAuthNewMemberTypes | GeneralNewMemberTypes;
  type: 'general' | 'auth';
  navigate: NavigateFunction;
}) => {
  try {
    const { data } = await axios.post<OAuthNewMemberTypes | GeneralNewMemberTypes>(`/members/new/${type}`, formData);

    navigate('/issues');
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
