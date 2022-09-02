import { LabelTypes } from '@/stores/labelList';
import axios, { AxiosError } from 'axios';

export const getLabelData = async (): Promise<LabelTypes[]> => {
  try {
    const { data } = await axios.get<LabelTypes[]>('api/labels');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const addLabelData = async (newLabel: LabelTypes): Promise<LabelTypes> => {
  try {
    const { data } = await axios.post<LabelTypes>('api/labels', newLabel);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

interface ReplaceLabelTypes {
  id: number;
  replacedLabel: LabelTypes;
}

type ResponseReplaceLabel = ReplaceLabelTypes & { id: number };

export const patchLabelData = async ({ id, replacedLabel }: ReplaceLabelTypes): Promise<ResponseReplaceLabel> => {
  try {
    const { data } = await axios.patch<ResponseReplaceLabel>(`api/labels/${id}`, replacedLabel);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const deleteLabelData = async (id: number): Promise<{ message: string }> => {
  try {
    const { data } = await axios.delete<{ message: string }>(`api/labels/${id}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
