import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';
import styled from 'styled-components';

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

const CommonSignUp = () => {
  return (
    <StyledDiv>
      <CommonSignUpForm FORM_INFO={FORM_INFO} />
    </StyledDiv>
  );
};

export default CommonSignUp;
