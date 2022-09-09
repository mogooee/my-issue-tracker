import { getIssuesData, getIssueData } from '@/api/issue';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';

import { useQuery } from '@tanstack/react-query';

const useFetchIssue = () => {
  const useIssuesData = () => useQuery<IssuesTypes>(['issues'], getIssuesData);

  const useIssueData = (issueId: number) => useQuery<ContentTypes>(['issue', issueId], () => getIssueData(issueId!));

  return {
    useIssuesData,
    useIssueData,
  };
};

export default useFetchIssue;
