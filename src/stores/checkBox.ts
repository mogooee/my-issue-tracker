import { atom } from 'recoil';
import { IssueStateType } from '@/stores/filter';

export interface CheckStateTypes {
  issueState: IssueStateType;
  parent: boolean;
  child: number[];
}

export const CheckState = atom<CheckStateTypes>({
  key: 'CheckState',
  default: { issueState: 'all', parent: false, child: [] },
});

interface DefaultCheckIdsTypes {
  openIds: number[];
  closedIds: number[];
}

export const DefaultCheckIds = atom<DefaultCheckIdsTypes>({
  key: 'DefaultCheckIds',
  default: { openIds: [], closedIds: [] },
});
