import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import { useQueryClient } from '@tanstack/react-query';
import { RedirectAuthTypes } from '@/api/sign';

import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

import * as S from '@/pages/Public/SignUp-OAuth/index.styles';

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
    <S.OAuthSignUp>
      <OAuthSignUpForm SignUpFormData={authData?.signUpFormData!} />
    </S.OAuthSignUp>
  );
};

export default OAuthSignUp;
