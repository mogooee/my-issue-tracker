import axios, { AxiosError } from 'axios';

export const uploadImage = async (file: any) => {
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const { data } = await axios.post<string>('api/images/upload', { file }, header);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
