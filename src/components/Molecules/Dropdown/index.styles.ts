import styled, { css } from 'styled-components';

export const Dropdown = styled.details<{ dropdownStyle: 'STANDARD' | 'FILTERBAR' }>`
  position: relative;
  width: fit-content;

  menu {
    ${({ dropdownStyle }) =>
      dropdownStyle === 'FILTERBAR'
        ? css`
            left: 0;
          `
        : css`
            right: 0;
          `}
  }
`;
