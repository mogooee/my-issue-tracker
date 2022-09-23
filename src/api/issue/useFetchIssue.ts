import {
  getIssuesData,
  getIssueData,
  updateIssueTitle,
  updateIssueState,
  addComment,
  updateComment,
  deleteComment,
  createNewIssue,
} from '@/api/issue';
import { IssuesTypes, ContentTypes } from '@/api/issue/types';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useResetRecoilState } from 'recoil';
import { NewIssueFormState } from '@/stores/newIssue';
import { OPEN_QUERY } from '@/hooks/useFilter';

const useFetchIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const resetNewIssueFormState = useResetRecoilState(NewIssueFormState);

  const useIssuesData = (page: number, queryString: string | null) => {
    const issueStateQuery = !document.location.search ? OPEN_QUERY : '';
    const queries = queryString || issueStateQuery;

    return useQuery<IssuesTypes>(['issues', page, queries], () => getIssuesData(page, queries));
  };

  const useIssueData = (issueId: number) =>
    useQuery<ContentTypes>(['issue', issueId], () => getIssueData(issueId), {
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

  const { mutate: createNewIssueMutate } = useMutation(createNewIssue, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['issues']);
      resetNewIssueFormState();
      navigate(`/issues/${data.id}`);
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
  };
};

export default useFetchIssue;
