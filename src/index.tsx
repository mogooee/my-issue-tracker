import React from 'react';
import ReactDOM from 'react-dom/client';
import axios, { AxiosError } from 'axios';
import App from './App';
import { worker } from './mocks/worker';
import { silentRefresh } from './api/sign';

if (process.env.NODE_ENV === 'development') {
  worker.start({ onUnhandledRequest: 'bypass' });
}

interface ErrorMessage {
  message: string;
}

export const unAuthorizedErrorMsg = {
  refreshToken: '유효하지 않은 refresh_token입니다.',
  accessToken: '요청에 Authorization 헤더가 존재하지 않습니다.',
};

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorMessage>) => {
    const status = error.response?.status;
    const { message } = error.response!.data;
    if (status === 401 && message === unAuthorizedErrorMsg.accessToken) {
      silentRefresh();
    }
    if (status === 401 && message === unAuthorizedErrorMsg.refreshToken) {
      // 메인으로 이동
    }
    return Promise.reject(error);
  },
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
