import styled from 'styled-components';

export const CommonSignUpForm = styled.div`
  max-width: 340px;
  width: 100%;

  h1 {
    margin: 0 0 20px 10px;
    ${({ theme }) => theme.FONTSTYLES.LINK_LARGE};
  }

  button {
    max-width: 340px;
    width: 100%;
    margin-top: 50px;
  }

  form:disabled {
    background: ${({ theme }) => theme.COLORS.LINE};
  }
`;
