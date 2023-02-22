import styled from 'styled-components';

export const ErrorPanel = styled.menu`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'flex-end' })};
  z-index: 99;
  position: absolute;
  padding: 12px;
  width: fit-content;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};

  p {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL}
    white-space: pre;
  }

  svg {
    stroke: ${({ theme }) => theme.COLORS.ERROR.RED};
  }

  button {
    color: ${({ theme }) => theme.COLORS.ERROR.RED};
  }
`;
