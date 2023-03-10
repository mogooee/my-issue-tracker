import styled from 'styled-components';

export const Login = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  width: 100%;
  height: 100vh;

  & > a:first-child {
    margin-bottom: 64px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
