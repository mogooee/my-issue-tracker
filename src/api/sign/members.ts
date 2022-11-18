import { UserTypes } from '@/api/issue/types';
import axios from 'axios';

export const getMemberList = async () => {
  const { data } = await axios.get<UserTypes[]>('api/members');
  return data;
};

export const getDuplicatesResult = async (router: string, value: string) => {
  const { data } = await axios.get(`api/members/${router}/${value}/exists`);
  return data;
};
