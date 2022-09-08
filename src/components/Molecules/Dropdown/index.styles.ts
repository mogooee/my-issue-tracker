import styled, { css } from 'styled-components';

export const Dropdown = styled.details<{ dropdownStyle: 'STANDARD' | 'FILTERBAR' | 'SIDEBAR' | 'ICON' }>`
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
`;
