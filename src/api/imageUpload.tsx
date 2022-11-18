import axios, { AxiosError } from 'axios';
import useNotifyError from '@/api/alertHelper';
import { ErrorMessage } from '@/api/constants';

export const uploadImage = async (file: any) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const { data } = await axios.post<string>('/server/api/images/upload', { file }, header);
    return data;
  } catch (error) {
    const err = error as AxiosError<ErrorMessage>;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNotifyError(err);
    throw err;
  }
};
