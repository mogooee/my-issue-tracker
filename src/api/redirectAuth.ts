import axios, { AxiosError } from 'axios';
import { TokenType } from '@/api/signUp';

export interface SignUpFormDataTypes {
  resourceOwnerId: string;
  email: string;
  profileImage: string;
}

export interface SignInMemberTypes {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

export interface RedirectAuthTypes {
  signUpFormData: SignUpFormDataTypes | null;
  signInMember: SignInMemberTypes | null;
  accessToken: TokenType | null;
}

export const getAuthMemberData = async (provider: string, code: string): Promise<RedirectAuthTypes> => {
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
