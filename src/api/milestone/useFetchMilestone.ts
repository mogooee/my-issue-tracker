import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMilestoneData,
  createNewMilestone,
  patchMilestoneData,
  patchMilestoneState,
  deleteMilestone,
  MilestoneListTypes,
} from '@/api/milestone';
import notifyError from '@/api/alertHelper';

const useFetchMilestone = () => {
  const queryClient = useQueryClient();

  const { data: milestoneData } = useQuery<MilestoneListTypes>(['milestones'], getMilestoneData, {
    useErrorBoundary: true,
  });

  const { mutate: createMilestoneMutate } = useMutation(createNewMilestone, {
    onSuccess: () => {
      queryClient.invalidateQueries(['milestones']);
    },
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  const { mutate: patchMilestoneDataMutate } = useMutation(patchMilestoneData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['milestones']);
    },
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  const { mutate: patchMilestoneStateMutate } = useMutation(patchMilestoneState, {
    onSuccess: () => {
      queryClient.invalidateQueries(['milestones']);
    },
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  const { mutate: deleteMilestoneMutate } = useMutation(deleteMilestone, {
    onSuccess: () => {
      queryClient.invalidateQueries(['milestones']);
    },
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  return {
    milestoneData,
    createMilestoneMutate,
    patchMilestoneDataMutate,
    patchMilestoneStateMutate,
    deleteMilestoneMutate,
  };
};

export default useFetchMilestone;
