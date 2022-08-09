import * as S from '@/components/Atoms/UserImage/index.styles';

export interface UserImageTypes {
  id: number;
  profileImage: string;
  imgSize?: 'MEDIUM' | 'SMALL';
}

const UserImage = ({ imgSize = 'SMALL', ...props }: UserImageTypes) => {
  const { profileImage, id } = props;
  const imgAlt = `${id}의 프로필 사진`;

  return <S.Img src={profileImage} alt={imgAlt} imgSize={imgSize} />;
};

export default UserImage;
