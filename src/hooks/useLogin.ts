import { useRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { UserInfoState } from '@/stores/userInfo';
import { getUserInfo, silentRefresh } from '@/api/testApi';

const useLogin = () => {
  const [isOAuth, setIsOAuth] = useRecoilState(OAuthState);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);

  const saveUserInfo = async () => {
    const { id, email, nickname, profileImage } = await getUserInfo();
    setUserInfo({ id, email, nickname, profileImage });
  };

  const login = async () => {
    await silentRefresh();
    await saveUserInfo();
    setIsOAuth(true);
  };

  const silentLogin = async () => {
    try {
      login();
    } catch (error) {
      setIsOAuth(false);
      throw error;
    }
  };

  return { isOAuth, setIsOAuth, userInfo, setUserInfo, silentLogin, login };
};

export default useLogin;
