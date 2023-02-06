import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import { useQueryClient } from '@tanstack/react-query';
import { RedirectAuthTypes } from '@/api/sign';

import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

import * as S from '@/pages/Public/SignUp-OAuth/index.styles';
import NotValidRedirectCode from '@/components/ErrorBoundary/NotValidCode';

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

  return authData ? (
    <S.OAuthSignUp>
      <OAuthSignUpForm SignUpFormData={authData?.signUpFormData!} />
    </S.OAuthSignUp>
  ) : (
    // 네트워크 요청 에러가 아니여서 리셋할 에러가 없으므로 빈 함수를 넣어놓았음
    <NotValidRedirectCode resetError={() => {}} />
  );
};

export default OAuthSignUp;
