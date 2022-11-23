import styled from 'styled-components';

export const Pagination = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};
  gap: 20px;
  margin: 40px 0;

  button:hover:not([disabled]) {
    color: ${({ theme }) => theme.COLORS.PRIMARY.BLUE};
  }

  ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
`;

export const PaginationNumberButton = styled.button<{ isActive: boolean }>`
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  ${({ isActive, theme }) =>
    isActive
      ? `background: ${theme.COLORS.PRIMARY.BLUE}; color: ${theme.COLORS.OFF_WHITE};
      &&&:hover:not([disabled]) {
        color: ${theme.COLORS.OFF_WHITE};
      }
      `
      : `background: transparent;
      &:hover {
        border: 1px solid ${theme.COLORS.LINE};
        background: ${theme.COLORS.OFF_WHITE};
      }
      `};
  ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
`;
