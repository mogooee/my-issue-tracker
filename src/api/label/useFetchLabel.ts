import { addLabelData, getLabelData, patchLabelData, deleteLabelData } from '@/api/label';
import { LabelTypes } from '@/api/issue/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFetchLabel = () => {
  const queryClient = useQueryClient();

  const useLabelData = () =>
    useQuery<LabelTypes[]>(['labels'], getLabelData, {
      cacheTime: 10000,
    });

  const { mutate: addLabel } = useMutation(addLabelData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const { mutate: replaceLabel } = useMutation(patchLabelData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  const { mutate: deleteLabel } = useMutation(deleteLabelData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
  });

  return {
    useLabelData,
    addLabel,
    replaceLabel,
    deleteLabel,
  };
};

export default useFetchLabel;
