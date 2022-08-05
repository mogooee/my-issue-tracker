import axios from 'axios';

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
}

export const getAuthMemberData = async (provider: string, code: string): Promise<RedirectAuthTypes> => {
  const { data } = await axios.get<RedirectAuthTypes>(`api/auth/${provider}?code=${code}`);
  return data;
};
