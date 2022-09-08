import { ColorLabelTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/Panel/Label/index.styles';
import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

const PanelPreviewLabel = ({ ...props }: ColorLabelTypes) => {
  const { backgroundColor } = props as ColorLabelTypes;

  return (
    <S.PreviewLabel>
      {backgroundColor && <Icon icon="SmallLabel" stroke={COLORS.LINE} fill={backgroundColor} />}
    </S.PreviewLabel>
  );
};

export default PanelPreviewLabel;
