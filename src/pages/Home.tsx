import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import styled from 'styled-components';
import Header from '@/components/Organisms/Header';
import OAuthState from '@/stores/auth';

const StyledLayer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;

  & > div {
    width: 1280px;
    margin: 0 auto;
  }
`;

const Home = () => {
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const isOauthState = useRecoilValue(OAuthState);

  return (
    <StyledLayer>
      <div>
        {isOauthState && <Header user={LoginUserInfoStateValue} />}
        <Outlet />
      </div>
    </StyledLayer>
  );
};

export default Home;
