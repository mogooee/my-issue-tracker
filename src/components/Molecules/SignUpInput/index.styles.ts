import styled, { css } from 'styled-components';

export const SignUpInput = styled.div<{ isError: boolean; str: string }>`
  span {
    display: inline-block;
    margin-left: 10px;
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
  }

  .caption {
    margin: 0px 0px 5px 10px;
    ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
  }

  ${({ isError, str }) => {
    return (
      isError &&
      css`
        position: relative;
        margin: 0 0 16px 0;

        form {
          border: 1px solid ${({ theme }) => theme.COLORS.ERROR.RED};
          background: ${({ theme }) => theme.COLORS.ERROR.LIGHT_RED};
        }

        &::after {
          content: '${str} 형식에 맞게 입력하세요';
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
