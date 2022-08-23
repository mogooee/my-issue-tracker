import axios, { AxiosError } from 'axios';
import { OAuthResponse } from '@/api/signUp';

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

export interface LoginTypes {
  id: string;
  password: string;
}

interface ErrorMessage {
  message: string;
}

export const generalLogin = async (formData: LoginTypes) => {
  try {
    const { data } = await axios.post<OAuthResponse>('api/members/signin', formData);
    return data;
  } catch (error) {
    const err = error as AxiosError<ErrorMessage>;
    // throw err;
  }
};

export const logout = async () => {
  try {
    await axios.head('api/members/signout');
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('Authentication');
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
