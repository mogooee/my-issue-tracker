import { ButtonTypes } from '@/components/Atoms/Button';
import { LabelType } from '@/components/Atoms/Label';
import { COLORS } from '@/styles/theme';

export const AUTHOR_LABEL_PROPS: LabelType = {
  labelStyle: 'LIGHT',
  title: '작성자',
  backgroundColorCode: COLORS.BACKGROUND,
  lineColor: COLORS.LINE,
  textColor: 'BLACK',
};

export const EDIT_BUTTON_PROPS: ButtonTypes = {
  label: '편집',
  size: 'SMALL',
  buttonStyle: 'NO_BORDER',
  iconInfo: {
    icon: 'Edit',
    stroke: COLORS.LABEL,
  },
};
