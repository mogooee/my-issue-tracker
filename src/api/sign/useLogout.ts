import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signout } from '@/api/sign';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { AxiosError } from 'axios';
import { ErrorMessage } from '@/api/constants';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsOAuth = useSetRecoilState(OAuthState);
  const resetLoginUserInfo = useResetRecoilState(LoginUserInfoState);

  const logoutLogic = () => {
    queryClient.clear();
    resetLoginUserInfo();
    setIsOAuth(false);
    localStorage.removeItem('Authentication');
    navigate('/');
  };

  const { mutate: useSignout } = useMutation(['signout'], signout, {
    onSuccess: () => {
      logoutLogic();
    },
    onError: (err) => {
      const Error = err as AxiosError<ErrorMessage>;
      const errorCode = Error.response?.data.errorCode;

      if (errorCode === 1002 || errorCode === 1004) {
        logoutLogic();
      }
    },
  });

  return { useSignout };
};

export default useLogout;
