import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import { useQueryClient } from '@tanstack/react-query';
import { RedirectAuthTypes } from '@/api/sign';
import styled from 'styled-components';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

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
    <StyledDiv>
      <OAuthSignUpForm SignUpFormData={authData?.signUpFormData!} />
    </StyledDiv>
  );
};

export default OAuthSignUp;
