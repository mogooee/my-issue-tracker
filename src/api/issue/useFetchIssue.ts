import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewIssue, getIssuesData } from '@/api/issue';
import { IssuesTypes } from '@/api/issue/types';

import { useResetRecoilState } from 'recoil';
import { NewIssueFormState } from '@/stores/newIssue';

const useFetchIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const resetNewIssueFormState = useResetRecoilState(NewIssueFormState);

  const { data: issues } = useQuery<IssuesTypes>(['issues'], getIssuesData);

  const { mutate: createNewIssueMutate } = useMutation(createNewIssue, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['issues']);
      resetNewIssueFormState();
      navigate(`/issues/${data.id}`);
    },
  });

  return {
    issues,
    createNewIssueMutate,
  };
};

export default useFetchIssue;
