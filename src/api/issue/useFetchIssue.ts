import { getIssuesData, getIssueData, patchIssueTitle } from '@/api/issue';
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

  return {
    useIssuesData,
    useIssueData,
    usePatchIssueTitle,
  };
};

export default useFetchIssue;
