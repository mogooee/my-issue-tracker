import { addLabelData, getLabelData, patchLabelData, deleteLabelData } from '@/api/label';
import { LabelTypes } from '@/api/issue/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import notifyError from '@/api/alertHelper';

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
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  const { mutate: replaceLabel } = useMutation(patchLabelData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  const { mutate: deleteLabel } = useMutation(deleteLabelData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['labels']);
    },
    onError: (error: Error) => {
      notifyError(error);
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
