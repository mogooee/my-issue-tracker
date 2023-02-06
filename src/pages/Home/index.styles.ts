import styled from 'styled-components';

export const Home = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;

  & > div {
    max-width: 1280px;
    margin: 0 auto;

    @media ${({ theme }) => theme.DEVICE.DESKTOP} {
      padding: 27px 32px 27px 32px;
    }

    @media ${({ theme }) => theme.DEVICE.TABLET} {
      padding: 18px 24px 18px 24px;
    }

    @media ${({ theme }) => theme.DEVICE.MOBILE} {
      padding: 8px 16px 8px 16px;
    }
  }
`;
