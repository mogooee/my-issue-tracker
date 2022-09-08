import styled, { css } from 'styled-components';

export const EditInput = styled.div<{ isError: boolean }>`
  ${({ isError }) =>
    isError &&
    css`
      position: relative;

      form {
        border: 1px solid red;
        background: ${({ theme }) => theme.COLORS.ERROR.LIGHT_RED};

        label {
          color: ${({ theme }) => theme.COLORS.ERROR.RED};
        }
      }

      &::before {
        position: absolute;
        content: 'YYYY-MM-DD 형식으로 입력해주세요.';
        top: -20px;
        left: 28px;
        color: ${({ theme }) => theme.COLORS.ERROR.RED};
        ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};
      }
    `}
`;
