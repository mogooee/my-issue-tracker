import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import useOnceQuery from '@/hooks/useOnceQuery';
import OAuthState from '@/stores/auth';
import { getUserInfo, silentRefresh } from '@/api/sign';
import { UserTypes } from '@/api/issue/types';

const useLogin = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(LoginUserInfoState);
  const setIsOAuth = useSetRecoilState(OAuthState);

  const saveAuthLoginState = (userInfo: UserTypes) => setLoginUserInfo(userInfo);

  const setSuccessLoginState = () => {
    setIsOAuth(true);
    localStorage.setItem('Authentication', 'true');
  };

  const onSuccessLogin = async () => {
    setSuccessLoginState();
    const userInfo = await getUserInfo();
    saveAuthLoginState(userInfo);
  };

  const useSilentLogin = () => {
    useOnceQuery(['silentLogin'], silentRefresh, {
      enabled: !!localStorage.getItem('Authentication'),
      onSuccess: () => {
        onSuccessLogin();
      },
      onError: () => {
        localStorage.removeItem('Authentication');
      },
    });
  };

  return { loginUserInfo, saveAuthLoginState, setSuccessLoginState, setLoginUserInfo, useSilentLogin, onSuccessLogin };
};

export default useLogin;
