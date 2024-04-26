import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactionTypes, getReactionData } from '@/api/issue/reaction';
import { addCommentReaction, deleteCommentReaction } from '@/api/issue';
import { CommentsTypes, ContentTypes } from './types';

const useFetchReaction = () => {
  const queryClient = useQueryClient();

  const useReactionData = () =>
    useQuery<ReactionTypes[]>(['reactions'], getReactionData, {
      cacheTime: Infinity,
      staleTime: Infinity,
    });

  const useAddIssueCommentReaction = (issueId: number) =>
    useMutation(addCommentReaction, {
      onMutate: async (newReaction) => {
        await queryClient.cancelQueries(['issue', issueId]);

        const previousIssue = queryClient.getQueryData<ContentTypes>(['issue', issueId]);
        const emoji =
          queryClient.getQueryData<ReactionTypes[]>(['reactions'])?.find((e) => e.name === newReaction.emojiName)
            ?.unicode ?? '';

        queryClient.setQueryData<ContentTypes>(
          ['issue', issueId],
          (old: ContentTypes | undefined): ContentTypes | undefined => {
            if (!old) return;
            const newComments: CommentsTypes[] = old.comments.map((comment) => {
              if (comment.id === newReaction.commentId) {
                const newReactions = [
                  ...comment.issueCommentReactionsResponse,
                  {
                    id: Number.MAX_SAFE_INTEGER,
                    emoji,
                    issueCommentReactorResponse: { id: newReaction.memberId, nickname: '' },
                  },
                ];

                return { ...comment, issueCommentReactionsResponse: newReactions };
              }
              return comment;
            });

            return { ...old, comments: newComments };
          },
        );

        return { previousIssue };
      },
      onError: (error: Error, _, context) => {
        queryClient.setQueryData(['issue', issueId], context?.previousIssue);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  const useDeleteIssueCommentReaction = (issueId: number) =>
    useMutation(deleteCommentReaction, {
      onMutate: async (deleteReaction) => {
        await queryClient.cancelQueries(['issue', issueId]);

        const previousIssue = queryClient.getQueryData<ContentTypes>(['issue', issueId]);

        queryClient.setQueryData<ContentTypes>(
          ['issue', issueId],
          (old: ContentTypes | undefined): ContentTypes | undefined => {
            if (!old) return;
            const newComments: CommentsTypes[] = old.comments.map((comment) => {
              if (comment.id === deleteReaction.commentId) {
                const newReactions = comment.issueCommentReactionsResponse.filter(
                  (r) => r.id !== deleteReaction.reactionId,
                );
                return { ...comment, issueCommentReactionsResponse: newReactions };
              }
              return comment;
            });

            return { ...old, comments: newComments };
          },
        );

        return { previousIssue };
      },
      onError: (error: Error, _, context) => {
        queryClient.setQueryData(['issue', issueId], context?.previousIssue);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['issue', issueId]);
      },
    });

  return {
    useReactionData,
    useAddIssueCommentReaction,
    useDeleteIssueCommentReaction,
  };
};

export default useFetchReaction;
