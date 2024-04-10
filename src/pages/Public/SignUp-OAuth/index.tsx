import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import { useQueryClient } from '@tanstack/react-query';
import { RedirectAuthTypes } from '@/api/sign';

import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

import * as S from '@/pages/Public/SignUp-OAuth/index.styles';
import ErrorBoundary from '@/components/ErrorBoundary';
import DuplicateEmail from '@/components/Organisms/DuplicateEmail';

const OAuthSignUp = () => {
  window.history.forward();

  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<RedirectAuthTypes>(['auth']);

  const resetSignUpFormErrorState = useResetRecoilState(SignUpFormErrorState);
  const resetSignUpFormState = useResetRecoilState(SignUpFormState);

  useEffect(() => {
    resetSignUpFormErrorState();
    resetSignUpFormState();
  }, []);

  return (
    <ErrorBoundary
      // eslint-disable-next-line react/no-unstable-nested-components
      fallbackRender={({ resetErrorBoundary }) => (
        <DuplicateEmail provider="이메일 가입하기" email="example@email.com" handleOnClick={resetErrorBoundary} />
      )}
    >
      <S.OAuthSignUp>
        <OAuthSignUpForm SignUpFormData={authData ? authData.signUpFormData : null} />
      </S.OAuthSignUp>
    </ErrorBoundary>
  );
};

export default OAuthSignUp;
