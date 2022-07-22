import styled, { css } from 'styled-components';

export const SignUpInput = styled.div<{ isError: boolean; id: string }>`
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
  }

  ${({ isError, id }) => {
    const str = id === '비밀번호 확인' ? '비밀번호가 일치하지 않습니다.' : `${id} 형식에 맞게 입력하세요`;

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
          content: '${str}';
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
