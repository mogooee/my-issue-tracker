import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMemberList } from '@/api/sign/members';
import { getLabelData } from '@/api/label';
import { getMilestoneData } from '@/api/milestone';
import { IssueSideBarModify } from '@/api/issue';
import notifyError from '@/api/alertHelper';

import { AxiosError } from 'axios';
import { ErrorMessage } from '@/api/constants';

const useFetchSideBarData = () => {
  const queryClient = useQueryClient();

  const { data: memberData, refetch: memberDataRefetch } = useQuery(['members'], getMemberList, {
    enabled: false,
  });

  const { data: labelData, refetch: labelDataRefetch } = useQuery(['labels'], getLabelData, { enabled: false });
  const { data: milestoneData, refetch: milestoneDataRefetch } = useQuery(['milestones'], getMilestoneData, {
    enabled: false,
  });

  const prefetchMembers = () => {
    queryClient.prefetchQuery({
      queryKey: ['members'],
      queryFn: getMemberList,
    });
  };

  const prefetchLabels = () => {
    queryClient.prefetchQuery({
      queryKey: ['labels'],
      queryFn: getLabelData,
    });
  };

  const prefetchMilestones = () => {
    queryClient.prefetchQuery({
      queryKey: ['milestones'],
      queryFn: getMilestoneData,
    });
  };

  const { mutate: IssueSideBarModifyMutate } = useMutation(IssueSideBarModify, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['issue', variables.issueId]);
    },
    onError: (error: Error, variables) => {
      const err = error as AxiosError<ErrorMessage>;
      const { errorCode } = err.response!.data;

      notifyError(error);

      if (+errorCode >= 3000 && +errorCode < 4000) {
        const queryKey = () => {
          switch (variables.category) {
            case 'assignees':
              return 'members';
            case 'labels':
              return 'labels';
            case 'milestone':
              return 'milestones';
          }
        };
        queryClient.resetQueries([queryKey()]);
      }
    },
  });

  return {
    memberData,
    memberDataRefetch,
    labelData,
    labelDataRefetch,
    milestoneData,
    milestoneDataRefetch,
    IssueSideBarModifyMutate,
    prefetchMembers,
    prefetchLabels,
    prefetchMilestones,
  };
};

export default useFetchSideBarData;
