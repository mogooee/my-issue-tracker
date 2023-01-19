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
    max-width: 1280px;
    margin: 0 auto;

    @media all and (min-width: 1024px) {
      padding: 27px 32px 27px 32px;
    }

    @media all and (min-width: 768px) and (max-width: 1023px) {
      padding: 18px 24px 18px 24px;
    }

    @media all and (max-width: 767px) {
      padding: 8px 16px 8px 16px;
    }
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
