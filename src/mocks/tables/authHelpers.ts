import { UserTypes } from '@/api/issue/types';
import { TEST_USER, USER_TABLE, UserTableTypes } from '../handlers/auth';

export const getCookie = (key: string, value: string) => {
  const matchKey = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return matchKey?.filter((el) => el === value)[0];
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split('; ');
  const expiration = 'Fri, 31 Dec 1999 00:00:00 GMT';

  cookies.forEach((cookie: any) => {
    const [key, _] = cookie.split('=');
    document.cookie = `${key}=; expires=${expiration}`;
    document.cookie = `${key}=; expires=${expiration}`;
    document.cookie = `${key}=; expires=${expiration}; domain=localhost`;
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
