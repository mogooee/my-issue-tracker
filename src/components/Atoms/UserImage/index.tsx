import React from 'react';
import * as S from '@/components/Atoms/UserImage/index.styles';
import { UserTypes } from '@/api/issue/types';

type AtomUserImage = { imgSize?: 'MEDIUM' | 'SMALL' };

const DEFAULT_IMG = 'https://avatars.githubusercontent.com/u/92701121?v=4';

export type UserImageTypes = UserTypes & AtomUserImage;

const UserImage = ({ imgSize = 'SMALL', ...props }: UserImageTypes) => {
  const { id, nickname, profileImage } = props;
  const imgAlt = `${nickname}의 프로필 사진`;

  const handleOnErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_IMG;
  };

  return <S.Img src={profileImage} alt={imgAlt} imgSize={imgSize} onError={handleOnErrorImg} />;
};

export default UserImage;
