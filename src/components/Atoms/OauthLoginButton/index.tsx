import * as logos from '@/components/Atoms/OauthLoginButton/svgs';
import * as S from '@/components/Atoms/OauthLoginButton/index.styles';

export type LogoType = keyof typeof logos;

export type OauthLoginTypes = {
  link: string;
  type: LogoType;
};

const OauthLoginButton = ({ link = '#!', type }: OauthLoginTypes) => {
  const Logo = logos[type];

  return (
    <S.StyledLink href={link}>
      <Logo />
    </S.StyledLink>
  );
};

export default OauthLoginButton;
