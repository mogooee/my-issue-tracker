import React from 'react';
import * as S from '@/components/Molecules/NavLink/index.styles';

interface NavDataTypes {
  icon?: React.ReactNode;
  title: string;
  link: string;
  dataId?: string;
}

export interface NavLinkTypes {
  navData: NavDataTypes[];
  navLinkStyle?: 'NORMAL' | 'LINE';
  defaultActive?: string;
  handleOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink = ({ navData, navLinkStyle = 'NORMAL', defaultActive, handleOnClick }: NavLinkTypes) => {
  const { pathname, search } = document.location;
  const url = decodeURIComponent(pathname + search);

  return (
    <S.StyledNavLinks navLinkStyle={navLinkStyle}>
      {navData.map(({ icon, title, link, dataId }) => {
        const isDefaultActive = !search && defaultActive === dataId;
        const isActive = url.includes(link);
        const active = isDefaultActive || isActive ? 'isActive' : '';

        return (
          <S.StyledNavLink key={title} className={active} to={link} data-id={dataId} onClick={handleOnClick}>
            {icon}
            <span>{title}</span>
          </S.StyledNavLink>
        );
      })}
    </S.StyledNavLinks>
  );
};

export default NavLink;
