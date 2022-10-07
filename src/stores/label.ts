import { LabelTypes } from '@/api/issue/types';
import { COLORS } from '@/styles/theme';

const initLabelState: LabelTypes = {
  id: 0,
  title: '',
  backgroundColorCode: COLORS.INPUT_BACKGROUND,
  description: '',
  textColor: 'BLACK',
};
