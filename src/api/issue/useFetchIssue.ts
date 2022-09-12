import {
  getIssuesData,
  getIssueData,
  updateIssueTitle,
  updateIssueState,
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

  const useUpdateIssueState = (issueId: number[]) =>
    useMutation(updateIssueState, {
      onSuccess: () => {
        issueId.forEach((id) => {
          queryClient.invalidateQueries(['issue', id]);
        });
      },
    });

  return {
    useIssuesData,
    useIssueData,
    useUpdateIssueTitle,
    useUpdateIssueState,
  };
};

export default useFetchIssue;
