import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import styled from 'styled-components';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
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
    <Suspense fallback={<LoadingSpinner size={80} />}>
      <ErrorBoundary fallback={<div>error</div>}>
        <StyledLayer>
          <div>
            {isOauthState && <Header user={LoginUserInfoStateValue} />}
            <Outlet />
          </div>
        </StyledLayer>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Home;
