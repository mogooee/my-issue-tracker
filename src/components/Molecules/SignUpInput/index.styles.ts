import styled, { css } from 'styled-components';

interface IsErrorTypes {
  id: string;
  state: boolean;
  errMsg: string;
}

export const SignUpInput = styled.div<{ isError?: IsErrorTypes }>`
  form {
    width: 100%;
  }

  span {
    display: inline-block;
    margin: 10px 0 0 10px;
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  }

  .caption {
    margin: 10px 0px 10px 10px;
    ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
    font-size: 1.1rem;
  }

  ${({ isError }) => {
    const { state, errMsg } = isError!;
    return (
      state &&
      css`
        position: relative;
        margin: 0 0 16px 0;

        form {
          border: 1px solid ${({ theme }) => theme.COLORS.ERROR.RED};
          background: ${({ theme }) => theme.COLORS.ERROR.LIGHT_RED};
        }

        &::after {
          content: '${errMsg}';
          position: absolute;
          left: 10px;
          width: 100%;
          color: ${({ theme }) => theme.COLORS.ERROR.RED};
          ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
        }
      `
    );
  }}
`;
