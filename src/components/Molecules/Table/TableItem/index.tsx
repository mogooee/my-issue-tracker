import React from 'react';
import styled from 'styled-components';

interface TableItemTypes {
  templateColumns: string;
  children: React.ReactNode;
}

type ItemTypes = Pick<TableItemTypes, 'templateColumns'>;

export const Item = styled.div<ItemTypes>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  align-content: center;
  align-items: center;
  height: 100px;
  padding: 36px 32px;
  background: ${({ theme }) => theme.COLORS.OFF_WHITE};
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};

  .checkbox {
    margin-top: -35px;
  }
`;

const TableItem = ({ templateColumns, children }: TableItemTypes) => (
  <Item templateColumns={templateColumns}>{children}</Item>
);
export default TableItem;
