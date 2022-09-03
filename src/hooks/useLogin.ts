import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { getUserInfo, silentRefresh } from '@/api/login_logout';
import { MemeberResponseTypes } from '@/api/signUp';
import OAuthState from '@/stores/auth';
import useOnceQuery from '@/hooks/useOnceQuery';

const useLogin = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(LoginUserInfoState);
  const setIsOAuth = useSetRecoilState(OAuthState);

  const saveAuthLoginState = (userInfo: MemeberResponseTypes) => {
    localStorage.setItem('Authentication', 'true');
    setLoginUserInfo(userInfo);
  };

  const onSuccessLogin = async () => {
    setIsOAuth(true);
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

  return { loginUserInfo, saveAuthLoginState, setLoginUserInfo, useSilentLogin, onSuccessLogin };
};

export default useLogin;
