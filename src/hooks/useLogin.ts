import { useRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { getUserInfo, silentRefresh } from '@/api/login_logout';
import { MemeberResponseTypes } from '@/api/signUp';

const useLogin = () => {
  const [isOAuth, setIsOAuth] = useRecoilState(OAuthState);
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(LoginUserInfoState);

  const onSuccessLogin = (userInfo: MemeberResponseTypes) => {
    setLoginUserInfo(userInfo);
    setIsOAuth(true);
  };

  const saveLoginUserInfo = async () => {
    const MemeberResponse = await getUserInfo();
    onSuccessLogin(MemeberResponse);
  };

  const silentLogin = async () => {
    await silentRefresh();
    await saveLoginUserInfo();
  };

  return { isOAuth, setIsOAuth, loginUserInfo, setLoginUserInfo, silentLogin, onSuccessLogin };
};

export default useLogin;
