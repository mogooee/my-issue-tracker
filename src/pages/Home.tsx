import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

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
    <StyledLayer>
      <Outlet />
    </StyledLayer>
  );
};

export default Home;
