import * as S from './index.styles';

interface NavDataTypes {
  icon?: React.ReactNode;
  title: string;
  link: string;
}

export interface NavLinkTypes {
  navData: NavDataTypes[];
  navLinkStyle?: 'NORMAL' | 'LINE';
}

export const NavLink = ({ navData, navLinkStyle = 'NORMAL' }: NavLinkTypes) => {
  return (
    <S.StyledNavLinks navLinkStyle={navLinkStyle}>
      {navData.map(({ icon, title, link }) => (
        <S.StyledNavLink key={title} to={link} navLinkStyle={navLinkStyle}>
          {icon}
          <span>{title}</span>
        </S.StyledNavLink>
      ))}
    </S.StyledNavLinks>
  );
};

export default NavLink;
