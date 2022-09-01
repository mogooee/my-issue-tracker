import { atom } from 'recoil';

export interface LabelContentsTypes {
  id: number;
  title: string;
  backgroundColorCode: string;
  description: string;
  textColor: 'WHITE' | 'BLACK';
}

export const initLabelState: LabelContentsTypes = {
  id: 0,
  title: '',
  backgroundColorCode: '#EFF0F6',
  description: '',
  textColor: 'BLACK',
};

export const LabelState = atom<LabelContentsTypes>({
  key: 'LabelState',
  default: initLabelState,
});

interface LabelEditStateTypes {
  type: 'ADD' | 'EDIT' | null;
}

export const LabelEditState = atom<LabelEditStateTypes>({
  key: 'LabelEditState',
  default: { type: null },
});
