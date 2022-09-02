import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { getUserInfo, silentRefresh } from '@/api/login_logout';
import { MemeberResponseTypes } from '@/api/signUp';

const useLogin = () => {
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(LoginUserInfoState);

  const onSuccessLogin = (userInfo: MemeberResponseTypes) => {
    localStorage.setItem('Authentication', 'true');
    setLoginUserInfo(userInfo);
  };

  const saveLoginUserInfo = async () => {
    const userInfo = await getUserInfo();
    localStorage.setItem('Authentication', 'true');
    onSuccessLogin(userInfo);
  };

  const silentLogin = (): boolean => {
    const { data: isAuthorized } = useQuery<any>(['silentLogin'], silentRefresh, {
      cacheTime: Infinity,
      staleTime: Infinity,
    });
    if (!isAuthorized) {
      localStorage.removeItem('Authentication');
      return false;
    }
    return true;
  };

  return { loginUserInfo, saveLoginUserInfo, setLoginUserInfo, silentLogin, onSuccessLogin };
};

export default useLogin;
