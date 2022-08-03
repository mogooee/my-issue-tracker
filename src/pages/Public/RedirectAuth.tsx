import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuthMemberData, RedirectAuthTypes } from '@/api/redirectAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';

const RedirectAuth = () => {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const code = searchParams.get('code')!;

  const navigate = useNavigate();

  const { data } = useQuery<RedirectAuthTypes>(['auth'], () => getAuthMemberData(provider, code));

  useEffect(() => {
    const { signUpFormData, signInMember } = data!;
    if (signInMember) {
      // 로그인 -> 로컬에 정보저장해서 로그인 유지
      window.localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/issues');
    } else if (signUpFormData) {
      navigate('/signup-oauth');
    }
  }, []);

  return <div />;
};

export default RedirectAuth;
