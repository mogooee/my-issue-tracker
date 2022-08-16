import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { getAuthMemberData, RedirectAuthTypes } from '@/api/redirectAuth';
import useLogin from '@/hooks/useLogin';

const RedirectAuth = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const code = searchParams.get('code')!;

  const { data } = useQuery<RedirectAuthTypes>(['auth'], () => getAuthMemberData(provider, code));

  const { login } = useLogin();

  useEffect(() => {
    const { signInMember } = data!;
    if (signInMember) {
      login();
      navigate('/issues');
    } else {
      navigate('/signup-oauth');
    }
  }, []);

  return <div />;
};

export default RedirectAuth;
