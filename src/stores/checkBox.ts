import { atom } from 'recoil';

export interface CheckStateTypes {
  parent: boolean;
  child: number[];
}

export const CheckState = atom<CheckStateTypes>({
  key: 'CheckState',
  default: { parent: false, child: [] },
});

interface DefaultCheckIdsTypes {
  ids: number[];
}

export const DefaultCheckIds = atom<number[]>({
  key: 'DefaultCheckIds',
  default: [],
});
