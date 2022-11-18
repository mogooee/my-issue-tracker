import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signout } from '@/api/sign';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsOAuth = useSetRecoilState(OAuthState);
  const resetLoginUserInfo = useResetRecoilState(LoginUserInfoState);
  const { mutate: useSignout } = useMutation(['signout'], signout, {
    onSuccess: () => {
      queryClient.clear();
      resetLoginUserInfo();
      setIsOAuth(false);
      localStorage.removeItem('Authentication');
      navigate('/');
    },
  });

  return { useSignout };
};

export default useLogout;
