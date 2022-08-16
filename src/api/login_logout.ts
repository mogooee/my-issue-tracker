import axios, { AxiosError } from 'axios';

export const silentRefresh = async () => {
  try {
    const { data } = await axios.get('/server/api/auth/reissue');
    const { accessToken } = data;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken.token}`;

    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const getUserInfo = async () => {
  try {
    const { data } = await axios.get('/server/api/members/info');
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
