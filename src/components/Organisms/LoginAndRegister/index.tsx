import { Link } from 'react-router-dom';
import LoginForm from '@/components/Molecules/CommonLoginForm';
import OauthLoginForm from '@/components/Molecules/OauthLoginForm';
import * as S from '@/components/Organisms/LoginAndRegister/index.styles';

const LoginAndRegister = (): JSX.Element => {
  return (
    <S.LoginAndRegister>
      <LoginForm />
      <Link to="signup" className="sign-up_btn">
        회원가입
      </Link>
      <OauthLoginForm />
    </S.LoginAndRegister>
  );
};

export default LoginAndRegister;
