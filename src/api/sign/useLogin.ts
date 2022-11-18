import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import OAuthState, { AppComponentMountState } from '@/stores/auth';
import { getUserInfo, RedirectAuthTypes, silentRefresh } from '@/api/sign';
import { UserTypes } from '@/api/issue/types';

const useLogin = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(LoginUserInfoState);
  const setIsOAuth = useSetRecoilState(OAuthState);
  const appComponentDidMount = useRecoilValue(AppComponentMountState);

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
    useQuery<RedirectAuthTypes>(['silentLogin'], silentRefresh, {
      enabled: !!localStorage.getItem('Authentication') && !appComponentDidMount,
      onSuccess: () => {
        onSuccessLogin();
      },
    });
  };

  return {
    loginUserInfo,
    saveAuthLoginState,
    setSuccessLoginState,
    setLoginUserInfo,
    useSilentLogin,
    onSuccessLogin,
  };
};

export default useLogin;
