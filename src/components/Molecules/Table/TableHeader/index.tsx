import React from 'react';
import styled from 'styled-components';

export interface TableHeaderTypes {
  children: React.ReactNode;
  templateColumns: string;
}

type HeaderTypes = Pick<TableHeaderTypes, 'templateColumns'>;

export const Header = styled.div<HeaderTypes>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  padding: 18px 32px;
  border-radius: 10px 10px 0 0;
  ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
  background: ${({ theme }) => theme.COLORS.BACKGROUND};

  a {
    padding: 0px;
  }
  a + a {
    padding-left: 24px;
  }

  .checkbox {
    margin-top: -7px;
  }
`;

const TableHeader = ({ children, templateColumns }: TableHeaderTypes) => (
  <Header templateColumns={templateColumns}>{children}</Header>
);
export default TableHeader;
