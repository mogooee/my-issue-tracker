import styled, { css } from 'styled-components';

export const FilterBar = styled.div`
  display: flex;

  input {
    border-left: none;
  }
`;

export const FilterBarInput = styled.input<{ isActive: boolean }>`
  width: 472px;
  padding: 6px 24px 6px 48px;
  border-radius: 0px 11px 11px 0px;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  background: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
  color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};

      background: ${({ theme }) => theme.COLORS.OFF_WHITE};
      border: 1px solid ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
    `}
`;
