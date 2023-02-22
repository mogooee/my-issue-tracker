import styled from 'styled-components';

export const CommonSignUp = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  width: 100%;
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    margin-top: 60px;
    height: 100%;
  }
`;
