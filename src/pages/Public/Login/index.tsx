import LoginAndRegister from '@/components/Organisms/LoginAndRegister';
import Logo from '@/components/Atoms/Logo';

import * as S from '@/pages/Public/Login/index.styles';

const Login = () => (
  <S.Login>
    <Logo logoSize="Large" />
    <LoginAndRegister />
  </S.Login>
);

export default Login;
