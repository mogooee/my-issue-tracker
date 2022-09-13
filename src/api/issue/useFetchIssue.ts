import {
  getIssuesData,
  getIssueData,
  updateIssueTitle,
  updateIssueState,
  addComment,
  updateComment,
  deleteComment,
} from '@/api/issue';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFetchIssue = () => {
  const queryClient = useQueryClient();

  const useIssuesData = () => useQuery<IssuesTypes>(['issues'], getIssuesData);

  const useIssueData = (issueId: number) =>
    useQuery<ContentTypes>(['issue', issueId], () => getIssueData(issueId!), {
      cacheTime: 10000,
      staleTime: 0,
    });

  const useUpdateIssueTitle = (issueId: number) =>
    useMutation(updateIssueTitle, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  const useUpdateIssueState = (issueIds: number[]) =>
    useMutation(updateIssueState, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issues']);
        issueIds.forEach((id) => {
          queryClient.invalidateQueries(['issue', id]);
        });
      },
    });

  const useAddIssueComment = (issueId: number) =>
    useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  const useUpdateIssueComment = (issueId: number) =>
    useMutation(updateComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  const useDeleteIssueComment = (issueId: number) =>
    useMutation(deleteComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  return {
    useIssuesData,
    useIssueData,
    useUpdateIssueTitle,
    useUpdateIssueState,
    useAddIssueComment,
    useUpdateIssueComment,
    useDeleteIssueComment,
  };
};

export default useFetchIssue;
