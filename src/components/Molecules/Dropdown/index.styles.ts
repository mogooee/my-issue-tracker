import styled, { css } from 'styled-components';
import { Indicator } from './Indicator/index.styles';

export const Dropdown = styled.details<{ dropdownStyle: 'STANDARD' | 'FILTERBAR' | 'SIDEBAR' | 'ICON' | 'BTN_GROUP' }>`
  position: relative;
  width: fit-content;

  menu {
    ${({ dropdownStyle }) => {
      if (dropdownStyle === 'FILTERBAR') {
        return css`
          left: 0;
        `;
      }
      if (dropdownStyle === 'STANDARD') {
        return css`
          right: 0;
        `;
      }
    }}
  }

  &[open] > summary::before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 80;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }

  &[open] > ${Indicator} {
    ${({ dropdownStyle }) => {
      if (dropdownStyle === 'BTN_GROUP') {
        return css`
          background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
          color: ${({ theme }) => theme.COLORS.OFF_WHITE};
        `;
      }
    }}
  }
`;
