import styled from 'styled-components';

export const CommonSignUpForm = styled.div`
  width: 340px;

  h1 {
    margin: 0 0 20px 10px;
    ${({ theme }) => theme.FONTSTYLES.LINK_LARGE};
  }

  button {
    margin-top: 50px;
  }

  form:disabled {
    background: ${({ theme }) => theme.COLORS.LINE};
  }
`;
