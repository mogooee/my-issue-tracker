import axios, { AxiosError } from 'axios';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';

export const getIssuesData = async (): Promise<IssuesTypes> => {
  try {
    const { data: issuesData } = await axios.get<IssuesTypes>('api/issues');
    return issuesData;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const getIssueData = async (issueId: number): Promise<ContentTypes> => {
  try {
    const { data: issueData } = await axios.get<ContentTypes>(`api/issues/${issueId}`);
    return issueData;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
