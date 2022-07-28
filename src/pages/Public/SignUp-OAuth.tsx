import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

import styled from 'styled-components';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

const OAuthSignUp = () => {
  const authData = {
    email: '도톨비@gmail.com',
  };

  const resetSignUpFormErrorState = useResetRecoilState(SignUpFormErrorState);
  const resetSignUpFormState = useResetRecoilState(SignUpFormState);

  useEffect(() => {
    resetSignUpFormErrorState();
    resetSignUpFormState();
  }, []);

  return (
    <StyledDiv>
      <OAuthSignUpForm authData={authData} />
    </StyledDiv>
  );
};

export default OAuthSignUp;
