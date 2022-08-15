import styled from 'styled-components';
import LoginAndRegister from '@/components/Organisms/LoginAndRegister';
import Logo from '@/components/Atoms/Logo';

const StyledLogin = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }
`;

const Login = () => (
  <StyledLogin>
    <Logo logoSize="Large" />
    <LoginAndRegister />
  </StyledLogin>
);

export default Login;
