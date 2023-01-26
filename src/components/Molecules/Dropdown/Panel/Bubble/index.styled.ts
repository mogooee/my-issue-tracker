import styled, { css } from 'styled-components';

export const ButtonGroup = styled.ul<{ position: 'LEFT' | 'RIGHT' }>`
  position: absolute;
  top: 40px;
  width: 160px;
  padding: 6px 0px;
  z-index: 99;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  border-radius: 6px;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL}
  ${({ position }) => {
    if (position === 'LEFT') {
      return css`
        left: 0px;
      `;
    }
    return css`
      right: 0px;
    `;
  }}

  li {
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
      button {
        color: ${({ theme }) => theme.COLORS.OFF_WHITE};
      }
    }
  }

  button {
    width: 100%;
    padding: 3px 12px;
    cursor: pointer;
    background: transparent;
    text-align: left;
    border: none;
  }

  &::before {
    content: '';
    position: absolute;
    border-bottom: 12px solid ${({ theme }) => theme.COLORS.LINE};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: -13px;
    ${({ position }) => {
      if (position === 'LEFT') {
        return css`
          left: 14px;
        `;
      }
      return css`
        right: 14px;
      `;
    }}
  }

  &::after {
    content: '';
    position: absolute;
    border-bottom: 12px solid ${({ theme }) => theme.COLORS.OFF_WHITE};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: -12px;
    ${({ position }) => {
      if (position === 'LEFT') {
        return css`
          left: 14px;
        `;
      }
      return css`
        right: 14px;
      `;
    }}
  }
`;
