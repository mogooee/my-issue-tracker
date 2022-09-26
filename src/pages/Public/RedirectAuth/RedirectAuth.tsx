import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import * as S from '@/pages/Public/RedirectAuth/index.styled';

import DuplicateEmail from '@/components/Organisms/DuplicateEmail/DuplicateEmail';
import { getRedirectAuthData, RedirectAuthTypes } from '@/api/sign';
import useLogin from '@/api/sign/useLogin';

interface ErrorMessage {
  message: string;
}

const RedirectAuth = () => {
  const { setSuccessLoginState, saveAuthLoginState } = useLogin();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const code = searchParams.get('code')!;

  const { data } = useQuery<RedirectAuthTypes>(['auth'], () => getRedirectAuthData(provider, code), {
    retry: 0,
  });

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

const RedirectErrorFallback = ({ error }: { error: Error }) => {
  const err = error as AxiosError<ErrorMessage>;
  const { status, data } = err.response!;
  if (status === 400) return <DuplicateEmail provider="이메일 가입하기" email="mogoo22@naver.com" />;
  return (
    <S.Error>
      <h1>{`${err.message}  🚧`}</h1>
      <p>{data.message}</p>
    </S.Error>
  );
};

export const FallbackRedirectAuth = () => (
  <ErrorBoundary fallbackRender={RedirectErrorFallback}>
    <RedirectAuth />
  </ErrorBoundary>
);

export default FallbackRedirectAuth;
