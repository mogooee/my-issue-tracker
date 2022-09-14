import axios, { AxiosError } from 'axios';
import { ContentTypes, IssuesTypes } from '@/api/issue/types';
import { NEW_ISSUE_FORM_TYPES } from '@/stores/newIssue';

export const getIssuesData = async (): Promise<IssuesTypes> => {
  try {
    const { data } = await axios.get<IssuesTypes>('api/issues');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

interface CreateNewIssueTypes {
  newIssueFormData: NEW_ISSUE_FORM_TYPES;
  memberId: number;
}

export const createNewIssue = async ({ newIssueFormData, memberId }: CreateNewIssueTypes): Promise<ContentTypes> => {
  try {
    const { data } = await axios.post<ContentTypes>(`api/issues?memberId=${memberId}`, newIssueFormData);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
