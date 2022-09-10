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

interface PatchIssueTitleRequestTypes {
  issueId: number;
  memberId: number;
  newTitle: { title: string };
}

export const patchIssueTitle = async ({
  issueId,
  memberId,
  newTitle,
}: PatchIssueTitleRequestTypes): Promise<ContentTypes> => {
  try {
    const { data: changedIssue } = await axios.patch<ContentTypes>(
      `api/issues/${issueId}/title?memberId=${memberId}`,
      newTitle,
    );
    return changedIssue;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

interface PatchIssueStateTypes {
  status: boolean;
  ids: number[];
}

