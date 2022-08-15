import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

const StyledLayer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;

  & > div {
    width: 1280px;
    margin: 0 auto;
  }
`;

const Home = () => (
  <Suspense fallback={<LoadingSpinner size={80} />}>
    <ErrorBoundary fallback={<div>error</div>}>
      <StyledLayer>
        <Outlet />
      </StyledLayer>
    </ErrorBoundary>
  </Suspense>
);

export default Home;
