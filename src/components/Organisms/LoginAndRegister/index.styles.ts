import styled from 'styled-components';

export const LoginAndRegister = styled.div`
  max-width: ${({ theme }) => theme.TEXT_INPUT_SIZE.LARGE.width};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

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
