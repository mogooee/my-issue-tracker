import { UserTypes } from '@/api/issue/types';
import axios, { AxiosError } from 'axios';

export const getMemberList = async () => {
  try {
    const { data } = await axios.get<UserTypes[]>('api/members');
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
