import styled from 'styled-components';

export const Error = styled.section`
  h1 {
    ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
  }

  p {
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
  }

  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  flex-direction: column;
  height: 100vh;
`;
