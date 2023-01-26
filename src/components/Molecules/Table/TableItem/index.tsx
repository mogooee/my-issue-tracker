import React from 'react';
import styled from 'styled-components';

interface TableItemTypes {
  children: React.ReactNode;
}

export const Item = styled.li`
  list-style: none;
  align-content: center;
  align-items: center;
  height: fit-content;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.LINE};
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const TableItem = ({ children }: TableItemTypes) => <Item>{children}</Item>;

export default TableItem;
