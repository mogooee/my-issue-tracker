import styled from 'styled-components';

export const DuplicateEmail = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  flex-direction: column;
  height: 100vh;

  button {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  }
`;

export const Header = styled.section`
  display: grid;

  place-items: center;
  h1 {
    ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
    font-weight: 700;
    white-space: pre-wrap;
    text-align: center;
  }
  p {
    margin: 15px 0 50px 0;
    ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
  }
`;
