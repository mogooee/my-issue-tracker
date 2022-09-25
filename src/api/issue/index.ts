import axios, { AxiosError } from 'axios';
import { ContentTypes, IssuesTypes } from '@/api/issue/types';
import { NEW_ISSUE_FORM_TYPES } from '@/stores/newIssue';
import { parsingFilterReg } from '@/hooks/useFilter';

interface Idtypes {
  issueId: number;
  commentId: number;
  reactionId: number;
  memberId: number;
}

export const getIssuesData = async (page: number, queryString: string): Promise<IssuesTypes> => {
  try {
    const queries =
      queryString
        .match(parsingFilterReg)
        ?.map((e) => encodeURIComponent(e))
        .join('+') || '';

    const { data: issuesData } = await axios.get<IssuesTypes>(
      `api/issues?page=${page}&q=${encodeURIComponent(queries)}`,
    );
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

type PostCommentReactionTypes = { emojiName: string } & Pick<Idtypes, 'issueId' | 'commentId' | 'memberId'>;

export const addCommentReaction = async ({
  issueId,
  commentId,
  memberId,
  emojiName,
}: PostCommentReactionTypes): Promise<ContentTypes> => {
  try {
    const { data: IssueChangedCommentReaction } = await axios.post<ContentTypes>(
      `api/issues/${issueId}/comments/${commentId}/reactions/${emojiName}?memberId=${memberId}`,
    );
    return IssueChangedCommentReaction;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const deleteCommentReaction = async ({
  issueId,
  memberId,
  commentId,
  reactionId,
}: Idtypes): Promise<ContentTypes> => {
  try {
    const { data: IssueChangedCommentReaction } = await axios.delete<ContentTypes>(
      `api/issues/${issueId}/comments/${commentId}/reactions/${reactionId}?memberId=${memberId}`,
    );
    return IssueChangedCommentReaction;
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

export const deleteIssue = async (issueId: number) => {
  try {
    const { data } = await axios.delete(`api/issues/${issueId}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

interface SideBarModifyTypes {
  method: 'delete' | 'post' | 'patch';
  issueId: number;
  category: 'labels' | 'assignees' | 'milestone';
  categoryId: number;
}

export const IssueSideBarModify = async ({ method, issueId, category, categoryId }: SideBarModifyTypes) => {
  // 일괄삭제 구현x
  const assigneesUrl = method === 'delete' ? `?clear=false&assigneeId=${categoryId}` : `/${categoryId}`;
  try {
    const { data } = await axios({
      url: `api/issues/${issueId}/${category}${category === 'assignees' ? assigneesUrl : `/${categoryId}`}`,
      method,
    });
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
