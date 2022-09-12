import axios, { AxiosError } from 'axios';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';

interface Idtypes {
  issueId: number;
  commentId: number;
  reactionId: number;
  memberId: number;
}

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

type IssueReqType = { title: string };

type PatchIssueTitleReqTypes = { newTitle: IssueReqType } & Pick<Idtypes, 'issueId' | 'memberId'>;

export const updateIssueTitle = async ({
  issueId,
  memberId,
  newTitle,
}: PatchIssueTitleReqTypes): Promise<ContentTypes> => {
  try {
    const { data: IssueChangedTitle } = await axios.patch<ContentTypes>(
      `api/issues/${issueId}/title?memberId=${memberId}`,
      newTitle,
    );
    return IssueChangedTitle;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

interface IssueStateReqTypes {
  status: boolean;
  ids: number[];
}

type PatchIssueStateReqTypes = { newState: IssueStateReqTypes } & Pick<Idtypes, 'memberId'>;

export const updateIssueState = async ({ newState, memberId }: PatchIssueStateReqTypes) => {
  try {
    const { data: issueData } = await axios.patch(`api/issues/update-status?memberId=${memberId}`, newState);
    return issueData;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

type CommentReqTypes = { content: string };

type PostIssueCommentTypes = { newComment: CommentReqTypes } & Pick<Idtypes, 'issueId' | 'memberId'>;

export const addComment = async ({ newComment, issueId, memberId }: PostIssueCommentTypes): Promise<ContentTypes> => {
  try {
    const { data: IssueChangedComment } = await axios.post<ContentTypes>(
      `api/issues/${issueId}/comments?memberId=${memberId}`,
      newComment,
    );
    return IssueChangedComment;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

type PatchCommentTypes = { newContent: CommentReqTypes } & Pick<Idtypes, 'issueId' | 'commentId' | 'memberId'>;

export const updateComment = async ({
  newContent,
  issueId,
  commentId,
  memberId,
}: PatchCommentTypes): Promise<ContentTypes> => {
  try {
    const { data: IssueChangedComment } = await axios.patch<ContentTypes>(
      `api/issues/${issueId}/comments/${commentId}?memberId=${memberId}`,
      newContent,
    );
    return IssueChangedComment;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

type DeleteCommentTypes = Omit<Idtypes, 'reactionId'>;

export const deleteComment = async ({ issueId, commentId, memberId }: DeleteCommentTypes): Promise<ContentTypes> => {
  try {
    const { data: IssueChangedComment } = await axios.delete<ContentTypes>(
      `api/issues/${issueId}/comments/${commentId}?memberId=${memberId}`,
    );
    return IssueChangedComment;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

