import { SignUpFormErrorState, SignUpFormState } from '@/stores/signUp';
import styled from 'styled-components';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

const CommonSignUp = () => {
  const resetSignUpFormErrorState = useResetRecoilState(SignUpFormErrorState);
  const resetSignUpFormState = useResetRecoilState(SignUpFormState);

  useEffect(() => {
    resetSignUpFormErrorState();
    resetSignUpFormState();
  }, []);

  return (
    <StyledDiv>
      <CommonSignUpForm FORM_INFO={FORM_INFO} />
    </StyledDiv>
  );
};

export default CommonSignUp;
