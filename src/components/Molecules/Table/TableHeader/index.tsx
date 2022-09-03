import React from 'react';
import styled from 'styled-components';

export interface TableHeaderTypes {
  children: React.ReactNode;
}

export const Header = styled.div`
  display: grid;
  align-items: center;
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

const TableHeader = ({ children }: TableHeaderTypes) => <Header>{children}</Header>;
export default TableHeader;
