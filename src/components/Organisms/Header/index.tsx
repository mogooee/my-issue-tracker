import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '@/hooks/useLogout';

import * as S from '@/components/Organisms/Header/index.styles';
import Icon from '@/components/Atoms/Icon';
import Logo from '@/components/Atoms/Logo';
import UserImage, { UserImageTypes } from '@/components/Atoms/UserImage';
import { MemeberResponseTypes } from '@/api/signUp';

interface HeaderTypes {
  user: MemeberResponseTypes;
}

const Header = ({ user }: HeaderTypes) => {
  const { id, nickname, profileImage } = user;

  const navigate = useNavigate();
  const { setLogout } = useLogout();

  const [clickTab, setclickTab] = useState<boolean>(false);

  const handleClickLogoutButton = async () => {
    await setLogout();
    navigate('/login');
  };

  return (
    <S.Header>
      <Logo logoSize="Medium" />
      <S.UserTab onClick={() => setclickTab((prev) => !prev)}>
        <Icon icon="Menu" />
        <UserImage id={id} nickname={nickname} profileImage={profileImage} imgSize="MEDIUM" />
      </S.UserTab>
      <S.LogoutButton clickTab={clickTab} onClick={handleClickLogoutButton}>
        로그아웃
      </S.LogoutButton>
    </S.Header>
  );
};

export default Header;
