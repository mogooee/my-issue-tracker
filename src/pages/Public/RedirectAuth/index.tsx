import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRedirectAuthData, RedirectAuthTypes } from '@/api/sign';
import useLogin from '@/api/sign/useLogin';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotValidRedirectCode from '@/components/ErrorBoundary/NotValidCode';

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
    } else {
      navigate('/signup-oauth');
    }
  }, []);

  return <div />;
};

const fallbackRedirectAuth = () => (
  <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => <NotValidRedirectCode resetError={resetErrorBoundary} />}>
    <RedirectAuth />
  </ErrorBoundary>
);

export default fallbackRedirectAuth;
