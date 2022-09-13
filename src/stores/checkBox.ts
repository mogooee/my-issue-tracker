import { atom } from 'recoil';

export interface CheckStateTypes {
  issueState: 'OPEN' | 'CLOSED' | 'ALL';
  parent: boolean;
  child: number[];
}

export const CheckState = atom<CheckStateTypes>({
  key: 'CheckState',
  default: { issueState: 'ALL', parent: false, child: [] },
});

interface DefaultCheckIdsTypes {
  openIds: number[];
  closedIds: number[];
}

export const DefaultCheckIds = atom<DefaultCheckIdsTypes>({
  key: 'DefaultCheckIds',
  default: { openIds: [], closedIds: [] },
});
