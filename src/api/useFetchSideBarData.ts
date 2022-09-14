import { useQuery } from '@tanstack/react-query';
import { getMemberList } from '@/api/sign/members';
import { getLabelData } from '@/api/label';
import { getMilestoneData } from '@/api/milestone';

const useFetchSideBarData = () => {
  const { data: memberData, refetch: memberDataRefetch } = useQuery(['members'], getMemberList, { enabled: false });
  const { data: labelData, refetch: labelDataRefetch } = useQuery(['labels'], getLabelData, { enabled: false });
  const { data: milestoneData, refetch: milestoneDataRefetch } = useQuery(['milestones'], getMilestoneData, {
    enabled: false,
  });

  return { memberData, memberDataRefetch, labelData, labelDataRefetch, milestoneData, milestoneDataRefetch };
};

export default useFetchSideBarData;
