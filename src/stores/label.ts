import { LabelTypes } from '@/api/issue/types';
import { COLORS } from '@/styles/theme';
import { atom } from 'recoil';

type EditStateType = 'ADD' | 'EDIT' | 'DELETE' | null;

interface LabelStateTypes {
  type: EditStateType;
  label: LabelTypes;
}

const initLabelState: LabelTypes = {
  id: 0,
  title: '',
  backgroundColorCode: COLORS.INPUT_BACKGROUND,
  description: '',
  textColor: 'BLACK',
};

export const LabelState = atom<LabelStateTypes>({
  key: 'LabelState',
  default: { type: null, label: initLabelState },
});
