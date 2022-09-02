import React from 'react';
import styled from 'styled-components';

interface TableItemTypes {
  children: React.ReactNode;
}

export const Item = styled.div`
  align-content: center;
  align-items: center;
  height: fit-content;
  overflow: hidden;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
`;

const TableItem = ({ children }: TableItemTypes) => <Item>{children}</Item>;

export default TableItem;
