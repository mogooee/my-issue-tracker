import Icon from '@/components/Atoms/Icon';
import Logo from '@/components/Atoms/Logo';
import UserImage, { UserImageTypes } from '@/components/Atoms/UserImage';
import * as S from '@/components/Organisms/Header/index.styles';
import { useState } from 'react';

interface HeaderTypes {
  user: UserImageTypes;
}

const Header = ({ user }: HeaderTypes) => {
  const { id, nickname, profileImage } = user;
  const [clickTab, setclickTab] = useState<boolean>(false);

  return (
    <S.Header>
      <Logo logoSize="Medium" />
      <S.UserTab onClick={() => setclickTab((prev) => !prev)}>
        <Icon icon="Menu" />
        <UserImage id={id} nickname={nickname} profileImage={profileImage} imgSize="MEDIUM" />
      </S.UserTab>
      <S.LogoutButton clickTab={clickTab}>로그아웃</S.LogoutButton>
    </S.Header>
  );
};

export default Header;
