import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import { RedirectAuthTypes } from '@/pages/Public/RedirectAuth';
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
