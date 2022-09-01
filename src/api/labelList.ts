import { LabelContentsTypes } from '@/stores/labelList';
import axios, { AxiosError } from 'axios';

export const getLabelData = async (): Promise<LabelContentsTypes[]> => {
  try {
    const { data } = await axios.get<LabelContentsTypes[]>('api/labels');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const addLabelData = async (newLabel: LabelContentsTypes): Promise<LabelContentsTypes> => {
  try {
    const { data } = await axios.post<LabelContentsTypes>('api/labels', newLabel);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

interface ReplaceLabelTypes {
  id: number;
  replacedLabel: LabelContentsTypes;
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
