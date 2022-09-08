import styled, { css } from 'styled-components';

export const ReactionPanel = styled.menu`
  position: absolute;
  z-index: 99;
  overflow: hidden;

  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  box-shadow: 0px 0px 55px ${({ theme }) => theme.COLORS.LINE};
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  border-radius: 8px;
  width: fit-content;
  padding: 6px;

  ul {
    ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'flex-start' })};
    gap: 4px;
    li {
      button {
        height: fit-content;
        padding: 0px 8px;
      }
    }
  }
`;

export const ReactionList = styled.li<{ isUsed: boolean }>`
  ${({ isUsed }) =>
    isUsed &&
    css`
      button {
        background: ${({ theme }) => theme.COLORS.PRIMARY.LIGHT_BLUE};
        border-radius: 8px;
      }
    `}
`;
