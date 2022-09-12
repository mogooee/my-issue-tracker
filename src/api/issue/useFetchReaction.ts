import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactionTypes, getReactionData } from '@/api/issue/reaction';
import { addCommentReaction, deleteCommentReaction } from '@/api/issue';

const useFetchReaction = () => {
  const queryClient = useQueryClient();

  const { data: reactions } = useQuery<ReactionTypes[]>(['reactions'], getReactionData, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const useAddIssueCommentReaction = (issueId: number) =>
    useMutation(addCommentReaction, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  const useDeleteIssueCommentReaction = (issueId: number) =>
    useMutation(deleteCommentReaction, {
      onSuccess: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  return {
    reactions,
    useAddIssueCommentReaction,
    useDeleteIssueCommentReaction,
  };
};

export default useFetchReaction;
