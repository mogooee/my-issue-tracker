import styled from 'styled-components';

export const CommonSignUpForm = styled.div`
  width: 340px;

  button {
    margin-top: 50px;
  }

  span {
    display: inline-block;
    margin: 15px 10px;
  }

  form:disabled {
    background: ${({ theme }) => theme.COLORS.LINE};
  }
`;
