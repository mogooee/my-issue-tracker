import { addLabelData, getLabelData, patchLabelData, deleteLabelData } from '@/api/labelList';
import { LabelContentsTypes } from '@/stores/labelList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useLabelFetch = () => {
  const queryClient = useQueryClient();

  const getLabel = () =>
    useQuery<LabelContentsTypes[]>(['labels'], getLabelData, {
      cacheTime: Infinity,
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
    getLabel,
    addLabel,
    replaceLabel,
    deleteLabel,
  };
};

export default useLabelFetch;
