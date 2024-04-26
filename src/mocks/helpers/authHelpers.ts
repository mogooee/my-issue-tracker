import { UserTypes } from '@/api/issue/types';
import { TEST_USER, USER_TABLE, UserTableTypes } from '../handlers/auth';

export const getCookie = (key: string) => {
  const matchKey = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return matchKey?.[0];
};

export const deleteCookie = (key: string) => {
  const cookies = document.cookie.split('; ');
  const expiration = 'Fri, 31 Dec 1999 00:00:00 GMT';

  cookies.forEach((cookie: any) => {
    const [cookieKey, _] = cookie.split('=');
    if (cookieKey === key) {
      document.cookie = `${key}=; expires=${expiration};`;
    }
  });
};

export const filterIdPassword = (obj: UserTableTypes) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !key.includes('loginId') && !key.includes('password')),
  ) as UserTypes;

export const getAuther = () => {
  const getSessionStorgeUserInfo = sessionStorage.getItem('user');
  if (getSessionStorgeUserInfo) {
    const parserUserInfo = JSON.parse(getSessionStorgeUserInfo) as UserTableTypes;
    const findUser = USER_TABLE.find((user) => user.nickname === parserUserInfo.nickname);

    if (!findUser) {
      USER_TABLE.push(parserUserInfo);
      return filterIdPassword(parserUserInfo);
    }
    return filterIdPassword(findUser);
  }

  return filterIdPassword(TEST_USER);
};
