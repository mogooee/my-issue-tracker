import { atom, selector } from 'recoil';
import { OPEN_QUERY } from '@/hooks/useFilter';

export const FilterState = atom<string>({
  key: 'FilterState',
  default: OPEN_QUERY,
});

export const PageState = atom<number>({
  key: 'PageState',
  default: 0,
});

export const FilterStatsState = selector({
  key: 'FilterStatsState',
  get: ({ get }) => {
    const filterState = get(FilterState);
    const isFiltering = filterState !== OPEN_QUERY;

    return { isFiltering };
  },
});
