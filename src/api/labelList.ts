import { LabelContentsTypes } from '@/stores/labelList';
import axios, { AxiosError } from 'axios';

export const getLabelData = async (): Promise<LabelContentsTypes[]> => {
  try {
    const { data } = await axios.get<LabelContentsTypes[]>('/server/api/labels');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const addNewLabel = async (newLabel: LabelContentsTypes): Promise<LabelContentsTypes> => {
  try {
    const { data } = await axios.post<LabelContentsTypes>('/server/api/labels', newLabel);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

