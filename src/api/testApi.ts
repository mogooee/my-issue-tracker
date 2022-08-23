import axios, { AxiosError } from 'axios';

export const testLoginOauth = async () => {
  try {
    const { data } = await axios.get('/server/api/auth/test');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
