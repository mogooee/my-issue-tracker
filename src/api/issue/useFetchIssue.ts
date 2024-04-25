import {
  getIssuesData,
  getIssueData,
  updateIssueTitle,
  updateIssueState,
  addComment,
  updateComment,
  deleteComment,
  createNewIssue,
  deleteIssue,
} from '@/api/issue';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { NewIssueFormState } from '@/stores/newIssue';
import useFilter from '@/hooks/useFilter';
import notifyError from '@/api/alertHelper';
import { getReactionData } from './reaction';

const useFetchIssue = (id?: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const resetNewIssueFormState = useResetRecoilState(NewIssueFormState);

  const useIssuesData = (page: number, queryString: string) => {
    const { changeFilterToURL } = useFilter();
    const queries = changeFilterToURL(queryString);

    return useQuery<IssuesTypes>(['issues', page, queries], () => getIssuesData(page, queries));
  };

  const useIssueData = (issueId: number) =>
    useQuery<ContentTypes>(
      ['issue', issueId],
      () => {
        queryClient.prefetchQuery({
          queryKey: ['reactions'],
          queryFn: getReactionData,
        });
        return getIssueData(issueId);
      },
      {
        refetchOnWindowFocus: false,
      },
    );

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
        issueIds.forEach((stateId) => {
          queryClient.invalidateQueries(['issue', stateId]);
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
      onError: (error: Error) => {
        notifyError(error);
      },
    });

  const useDeleteIssueComment = (issueId: number) =>
    useMutation(deleteComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
      onError: (error: Error) => {
        notifyError(error);
      },
    });

  const { mutate: createNewIssueMutate } = useMutation(createNewIssue, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['issues']);
      resetNewIssueFormState();
      navigate(`/issues/${data.id}`);
    },
  });

  const { mutate: deleteIssueMutate } = useMutation(deleteIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries(['issue', id]);
      navigate(`/issues/`);
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
    createNewIssueMutate,
    deleteIssueMutate,
  };
};

export default useFetchIssue;
