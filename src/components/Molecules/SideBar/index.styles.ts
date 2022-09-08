import styled, { css } from 'styled-components';

export const SideBar = styled.div`
  width: fit-content;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.LINE};
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};

  .sidebar_item:first-child {
    border-radius: 16px 16px 0 0;
  }

  .sidebar_item:last-child {
    border-bottom: none;
    border-radius: 0 0 16px 16px;
  }
`;

export const SideBarItem = styled.div`
  padding: 34px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.LINE};
`;

export const SideBarContent = styled.ul<{ isEmpty: boolean }>`
  ${({ isEmpty }) =>
    !isEmpty &&
    css`
      margin-top: 18px;
    `}

  li {
    margin-bottom: 16px;
  }

  li:last-child {
    margin-bottom: 0px;
  }
`;

export const SideBarAssignee = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    color: ${({ theme }) => theme.COLORS.LABEL};
  }
`;
