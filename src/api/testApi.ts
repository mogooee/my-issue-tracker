import axios, { AxiosError } from 'axios';

export const testLoginOauth = async (id: number) => {
  try {
    const { data } = await axios.get(`api/auth/test?memberId=${id}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const silentRefresh = async () => {
  try {
    const { data } = await axios.get('api/silent-refresh');
    const { accessToken } = data;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const getUserInfo = async () => {
  try {
    const { data } = await axios.get('api/auth/userinfo');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
