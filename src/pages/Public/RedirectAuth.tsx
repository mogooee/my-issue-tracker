import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { getRedirectAuthData, RedirectAuthTypes } from '@/api/sign';
import useLogin from '@/api/sign/useLogin';

const RedirectAuth = () => {
  const { setSuccessLoginState, saveAuthLoginState } = useLogin();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const code = searchParams.get('code')!;

  const { data } = useQuery<RedirectAuthTypes>(['auth'], () => getRedirectAuthData(provider, code));

  useEffect(() => {
    if (!data) return;

    const { signInMember } = data;

    if (signInMember) {
      setSuccessLoginState();
      saveAuthLoginState(signInMember);
      navigate('/issues');
    } else {
      navigate('/signup-oauth');
    }
  }, []);

  return <div />;
};

export default RedirectAuth;
