import { ColorLabelTypes, UserImgLabelTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/Panel/Label/index.styles';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

const PanelPreviewLabel = ({ ...props }: ColorLabelTypes | UserImgLabelTypes) => {
  const { backgroundColor } = props as ColorLabelTypes;

  const { profileImageUrl, loginId } = props as UserImgLabelTypes;
  const userImgAlt = `${loginId}의 프로필사진`;

  return (
    <S.PreviewLabel>
      {profileImageUrl && <img src={profileImageUrl} alt={userImgAlt} />}
      {backgroundColor && <Icon icon="SmallLabel" stroke={COLORS.LINE} fill={backgroundColor} />}
    </S.PreviewLabel>
  );
};

export default PanelPreviewLabel;
