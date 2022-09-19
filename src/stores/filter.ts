import { atom, selector } from 'recoil';

export type IssueStateType = 'open' | 'closed' | 'all';
export type IssueAboutMyselfType = 'me';
export type NoFilterKeysType = 'assignee' | 'label' | 'milestone';

export interface FilterStateTypes {
  [key: string]: string | string[];
  is: IssueStateType;
  mentions: string | IssueAboutMyselfType;
  author: string | IssueAboutMyselfType;
  assignee: string | IssueAboutMyselfType;
  label: string[];
  milestone: string;
  no: NoFilterKeysType[];
}

export const initFilterState: FilterStateTypes = {
  is: 'open',
  author: '',
  assignee: '',
  mentions: '',
  label: [],
  milestone: '',
  no: [],
};

export const FilterState = atom<FilterStateTypes>({
  key: 'FilterState',
  default: initFilterState,
});

export const PageState = atom<number>({
  key: 'PageState',
  default: 0,
});

export const FilterStatsState = selector({
  key: 'FilterStatsState',
  get: ({ get }) => {
    const filterState = get(FilterState);
    const isFiltering = JSON.stringify(filterState) !== JSON.stringify(initFilterState);

    return { isFiltering };
  },
});
