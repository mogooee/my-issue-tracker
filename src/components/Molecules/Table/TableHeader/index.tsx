import React from 'react';
import styled from 'styled-components';
import { StyledNavLinks } from '@/components/Molecules/NavLink/index.styles';

export interface TableHeaderTypes {
  children: React.ReactNode;
}

export const Header = styled.div`
  display: grid;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.LINE};
  border-radius: 10px 10px 0 0;
  ${({ theme }) => theme.FONTSTYLES.LINK_SMALL};
  background: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 24px 32px;

  a {
    padding: 0px;
  }

  ${StyledNavLinks} {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .checkbox {
    margin-top: -7px;
  }
`;

const TableHeader = ({ children }: TableHeaderTypes) => <Header>{children}</Header>;
export default TableHeader;
