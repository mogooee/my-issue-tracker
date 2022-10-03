import { LabelTypes } from '@/api/issue/types';
import axios, { AxiosError } from 'axios';

export const getLabelData = async (): Promise<LabelTypes[]> => {
  const { data } = await axios.get<LabelTypes[]>('api/labels');
  return data;
};

export const addLabelData = async (newLabel: LabelTypes): Promise<LabelTypes> => {
  const { data } = await axios.post<LabelTypes>('api/labels', newLabel);
  return data;
};

interface ReplaceLabelTypes {
  id: number;
  replacedLabel: LabelTypes;
}

type ResponseReplaceLabel = ReplaceLabelTypes & { id: number };

export const patchLabelData = async ({ id, replacedLabel }: ReplaceLabelTypes): Promise<ResponseReplaceLabel> => {
  const { data } = await axios.patch<ResponseReplaceLabel>(`api/labels/${id}`, replacedLabel);
  return data;
};

export const deleteLabelData = async (id: number): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`api/labels/${id}`);
  return data;
};
