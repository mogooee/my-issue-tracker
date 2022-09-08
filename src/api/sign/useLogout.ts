import { useResetRecoilState, useSetRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { signout } from '@/api/sign';

const useLogout = () => {
  const setIsOAuth = useSetRecoilState(OAuthState);
  const resetLoginUserInfo = useResetRecoilState(LoginUserInfoState);

  const setLogout = async () => {
    await signout();
    resetLoginUserInfo();
    setIsOAuth(false);
  };

  return { setLogout };
};

export default useLogout;
