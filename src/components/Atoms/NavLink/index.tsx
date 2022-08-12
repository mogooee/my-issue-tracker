import * as S from './index.styles';

interface NavDataTypes {
  icon?: React.ReactNode;
  title: string;
  link: string;
}

interface NavTypes {
  navData: NavDataTypes[];
}

export const NavLink = ({ navData }: NavTypes) => {
  return (
    <>
      {navData.map(({ icon, title, link }) => (
        <S.StyledNavLink key={title} to={link}>
          {icon}
          <span>{title}</span>
        </S.StyledNavLink>
      ))}
    </>
  );
};

export default NavLink;
