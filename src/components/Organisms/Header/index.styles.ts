import styled from 'styled-components';

export const Header = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  padding: 27px 0 60px 0;
  position: relative;
`;

export const UserTab = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px 2px 2px 16px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.COLORS.TAB_LINE};

  svg {
    margin-right: 10px;
  }

  img {
    display: block;
  }
`;

export const LogoutButton = styled.button<{ clickTab: boolean }>`
  ${({ theme }) => theme.FONTSTYLES.TEXT_XSMALL};

  cursor: pointer;
  position: absolute;
  top: 87px;
  right: -5px;
  width: 100px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  color: ${({ theme }) => theme.COLORS.LABEL};

  display: ${({ clickTab }) => (clickTab ? 'block' : 'none')};
`;
