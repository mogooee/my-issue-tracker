import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMemberList } from '@/api/sign/members';
import { getLabelData } from '@/api/label';
import { getMilestoneData } from '@/api/milestone';
import { IssueSideBarModify } from '@/api/issue';

const useFetchSideBarData = () => {
  const queryClient = useQueryClient();

  const { data: memberData, refetch: memberDataRefetch } = useQuery(['members'], getMemberList, { enabled: false });
  const { data: labelData, refetch: labelDataRefetch } = useQuery(['labels'], getLabelData, { enabled: false });
  const { data: milestoneData, refetch: milestoneDataRefetch } = useQuery(['milestones'], getMilestoneData, {
    enabled: false,
  });

  const { mutate: IssueSideBarModifyMutate } = useMutation(IssueSideBarModify, {
    onSuccess: () => {
      queryClient.invalidateQueries(['issue']);
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
  };
};

export default useFetchSideBarData;
