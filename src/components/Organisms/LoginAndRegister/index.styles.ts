import styled from 'styled-components';

export const LoginAndRegister = styled.div`
  display: grid;
  place-items: center;

  .sign-up_btn {
    margin-top: 24px;
    text-decoration: none;
    color: ${({ theme }) => theme.COLORS.BODY};
    ${({ theme }) => theme.FONTSTYLES.LINK_XSMALL};

    &:visited {
      text-decoration: none;
    }
  }
`;
