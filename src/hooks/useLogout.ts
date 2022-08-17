import { useResetRecoilState, useSetRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { logout } from '@/api/login_logout';

const useLogout = () => {
  const setIsOAuth = useSetRecoilState(OAuthState);
  const resetLoginUserInfo = useResetRecoilState(LoginUserInfoState);

  const setLogout = async () => {
    await logout();
    resetLoginUserInfo();
    setIsOAuth(false);
  };

  return { setLogout };
};

export default useLogout;
