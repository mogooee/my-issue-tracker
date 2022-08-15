import * as S from '@/components/Atoms/UserImage/index.styles';

export interface UserImageTypes {
  id: number;
  nickname: string;
  profileImage: string;
  imgSize?: 'MEDIUM' | 'SMALL';
}

const UserImage = ({ imgSize = 'SMALL', ...props }: UserImageTypes) => {
  const { id, nickname, profileImage } = props;
  const imgAlt = `${nickname}의 프로필 사진`;

  return <S.Img src={profileImage} alt={imgAlt} imgSize={imgSize} />;
};

export default UserImage;
