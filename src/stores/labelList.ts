import { atom, selector } from 'recoil';

export interface LabelContentsTypes {
  id: number;
  title: string;
  backgroundColorCode: string;
  description: string;
  textColor: 'WHITE' | 'BLACK';
}

export const initLabelListState: LabelContentsTypes = {
  id: 0,
  title: '',
  backgroundColorCode: '',
  description: '',
  textColor: 'BLACK',
};

export const LabelListState = atom<LabelContentsTypes>({
  key: 'LabelListState',
  default: initLabelListState,
});

interface LabelEditStateTypes {
  type: 'ADD' | 'EDIT' | null;
}

export const LabelEditState = atom<LabelEditStateTypes>({
  key: 'LabelEditState',
  default: { type: null },
});
