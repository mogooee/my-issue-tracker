import React from 'react';
import * as S from '@/components/Molecules/NavLink/index.styles';

interface NavDataTypes {
  icon?: React.ReactNode;
  title: string;
  link: string;
}

export interface NavLinkTypes {
  navData: NavDataTypes[];
  navLinkStyle?: 'NORMAL' | 'LINE';
}

const NavLink = ({ navData, navLinkStyle = 'NORMAL' }: NavLinkTypes) => (
  <S.StyledNavLinks navLinkStyle={navLinkStyle}>
    {navData.map(({ icon, title, link }) => (
      <S.StyledNavLink key={title} to={link} navLinkStyle={navLinkStyle}>
        {icon}
        <span>{title}</span>
      </S.StyledNavLink>
    ))}
  </S.StyledNavLinks>
);

export default NavLink;
