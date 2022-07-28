import { resetSignUpForm } from '@/stores/signUp';
import styled from 'styled-components';
import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

const CommonSignUp = () => {
  resetSignUpForm();

  return (
    <StyledDiv>
      <CommonSignUpForm FORM_INFO={FORM_INFO} />
    </StyledDiv>
  );
};

export default CommonSignUp;
