import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import Header from '@/components/Organisms/Header';
import OAuthState from '@/stores/auth';
import * as S from '@/pages/Home/index.styles';

const Home = () => {
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const isOauthState = useRecoilValue(OAuthState);

  return (
    <S.Home>
      <div>
        {isOauthState && <Header user={LoginUserInfoStateValue} />}
        <Outlet />
      </div>
    </S.Home>
  );
};

export default Home;
