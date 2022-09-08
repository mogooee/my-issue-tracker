import { getIssuesData } from '@/api/issue';
import { IssuesTypes } from '@/api/issue/types';

import { useQuery } from '@tanstack/react-query';

const useFetchIssue = () => {
  const { data: issues } = useQuery<IssuesTypes>(['issues'], getIssuesData);

  return {
    issues,
  };
};

export default useFetchIssue;
