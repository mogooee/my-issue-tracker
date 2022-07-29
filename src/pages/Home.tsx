import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';

const StyledLayer = styled.div`
  padding: 0px 80px;
  height: 100vh;

  & > div {
    max-width: 1440px;
    margin: 0 auto;
  }
`;

const Home = () => {
  return (
    <Suspense fallback={<LoadingSpinner size={80} />}>
      <ErrorBoundary fallback={<div>error</div>}>
        <StyledLayer>
          <Outlet />
        </StyledLayer>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Home;
