import axios, { AxiosError } from 'axios';
import { IssuesTypes } from '@/api/issue/types';

export const getIssuesData = async (): Promise<IssuesTypes> => {
  try {
    const { data } = await axios.get<IssuesTypes>('api/issues');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
