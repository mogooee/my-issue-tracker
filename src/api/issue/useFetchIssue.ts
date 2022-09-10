import { getIssuesData, getIssueData, patchIssueTitle, patchIssueState } from '@/api/issue';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFetchIssue = () => {
  const queryClient = useQueryClient();

  const useIssuesData = () => useQuery<IssuesTypes>(['issues'], getIssuesData);

  const useIssueData = (issueId: number) => useQuery<ContentTypes>(['issue', issueId], () => getIssueData(issueId!));

  const usePatchIssueTitle = (issueId: number) =>
    useMutation(patchIssueTitle, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  const usePatchIssueState = (issueId: number[]) =>
    useMutation(patchIssueState, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issues']);
        issueId.forEach((id) => {
          queryClient.invalidateQueries(['issue', id]);
        });
      },
    });

  return {
    useIssuesData,
    useIssueData,
    usePatchIssueTitle,
    usePatchIssueState,
  };
};

export default useFetchIssue;
