import { addLabelData, getLabelData, patchLabelData, deleteLabelData } from '@/api/label';
import { LabelTypes } from '@/api/issue/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFetchLabel = () => {
  const queryClient = useQueryClient();

  const { data: labelData } = useQuery<LabelTypes[]>(['labels'], getLabelData);

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
    labelData,
    addLabel,
    replaceLabel,
    deleteLabel,
  };
};

export default useFetchLabel;
