import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '@/api/sign/useLogout';

import * as S from '@/components/Organisms/Header/index.styles';
import Icon from '@/components/Atoms/Icon';
import Logo from '@/components/Atoms/Logo';
import UserImage from '@/components/Atoms/UserImage';
import { UserTypes } from '@/api/issue/types';

interface HeaderTypes {
  user: UserTypes;
}

const Header = ({ user }: HeaderTypes) => {
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
        <UserImage {...user} imgSize="MEDIUM" />
      </S.UserTab>
      <S.LogoutButton clickTab={clickTab} onClick={handleClickLogoutButton}>
        로그아웃
      </S.LogoutButton>
    </S.Header>
  );
};

export default Header;
