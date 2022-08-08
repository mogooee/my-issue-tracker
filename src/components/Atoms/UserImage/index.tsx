import * as S from '@/components/Atoms/UserImage/index.styles';

export interface UserImageTypes {
  id: number;
  profileImageUrl: string;
  imgSize?: 'MEDIUM' | 'SMALL';
}

const UserImage = ({ imgSize = 'SMALL', ...props }: UserImageTypes) => {
  const { profileImageUrl, id } = props;
  const imgAlt = `${id}의 프로필 사진`;

  return <S.Img src={profileImageUrl} alt={imgAlt} imgSize={imgSize} />;
};

export default UserImage;
