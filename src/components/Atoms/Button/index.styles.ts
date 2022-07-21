import styled, { css } from 'styled-components';
import { ButtonTypes } from '@/components/Atoms/Button';

type StyledButtonTypes = Pick<ButtonTypes, 'size' | 'buttonStyle'>;

export const Button = styled.button<StyledButtonTypes>`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  padding: 0px 24px;
  border: none;
  border-radius: 20px;
  background: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
  color: ${({ theme }) => theme.COLORS.OFF_WHITE};
  cursor: pointer;

  svg {
    margin-right: 4px;
  }

  ${({ size }) => {
    switch (size) {
      case 'LARGE':
        return css`
          ${({ theme }) => theme.BUTTON_SIZE.LARGE};
          ${({ theme }) => theme.FONTSTYLES.LINK_MEDIUM};
        `;
      case 'MEDIUM':
        return css`
          ${({ theme }) => theme.BUTTON_SIZE.MEDIUM};
          ${({ theme }) => theme.FONTSTYLES.LINK_MEDIUM};
        `;
      case 'SMALL':
        return css`
          padding: 0px 20px;
          border-radius: 11px;
          ${({ theme }) => theme.BUTTON_SIZE.SMALL};
          ${({ theme }) => theme.FONTSTYLES.LINK_XSMALL};
        `;
    }
  }}

  ${({ buttonStyle }) => {
    if (buttonStyle === 'STANDARD') {
      return css`
        &:hover:not([disabled]) {
          background: ${({ theme }) => theme.COLORS.PRIMARY.DARK_BLUE};
        }

        &:active:not([disabled]) {
          border: 4px solid ${({ theme }) => theme.COLORS.PRIMARY.LIGHT_BLUE};
        }

        &:disabled {
          opacity: 0.5;
          cursor: default;
        }
      `;
    }
  }} 

  ${({ buttonStyle }) => {
    if (buttonStyle === 'SECONDARY') {
      return css`
        border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
        color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
        background: ${({ theme }) => theme.COLORS.OFF_WHITE};

        path {
          stroke: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
        }

        &:hover:not([disabled]) {
          border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY.DARK_BLUE};
          color: ${({ theme }) => theme.COLORS.PRIMARY.DARK_BLUE};
          background: ${({ theme }) => theme.COLORS.OFF_WHITE};

          path {
            stroke: ${({ theme }) => theme.COLORS.PRIMARY.DARK_BLUE};
          }
        }

        &:active:not([disabled]) {
          border: 4px solid ${({ theme }) => theme.COLORS.PRIMARY.LIGHT_BLUE};
          color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};

          path {
            stroke: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
          }
        }

        &:disabled {
          opacity: 0.5;
          cursor: default;
        }
      `;
    }
  }}

  ${({ buttonStyle }) => {
    if (buttonStyle === 'NO_BORDER') {
      return css`
        width: fit-content;
        border: none;
        padding: 0;
        background: none;
        color: ${({ theme }) => theme.COLORS.BODY};

        &:hover:not([disabled]) {
          color: ${({ theme }) => theme.COLORS.ERROR.RED};
          svg {
            stroke: ${({ theme }) => theme.COLORS.ERROR.RED};
          }
        }

        &:disabled {
          opacity: 0.5;
          cursor: default;
        }

        &:disabled:hover {
          color: ${({ theme }) => theme.COLORS.BODY};
        }
      `;
    }
  }}
`;
