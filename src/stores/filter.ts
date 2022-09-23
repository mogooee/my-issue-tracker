import { atom, selector } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { parsingFilterReg } from '@/hooks/useFilter';

export type IssueStateType = 'open' | 'closed' | 'all';
export type IssueAboutMyselfType = '@me';
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

const engReg = /^[a-zA-Z]*$/g;

export const FilterStatsState = selector({
  key: 'FilterStatsState',
  get: ({ get }) => {
    const filterState = get(FilterState);
    const userInfo = get(LoginUserInfoState);
    const page = get(PageState);

    const isFiltering = JSON.stringify(filterState) !== JSON.stringify(initFilterState);

    const defineFilterString = (type: 'FILTER_BAR' | 'QUERY') =>
      Object.keys(filterState)
        .reduce((acc, key) => {
          const value = filterState[key];

          if (Array.isArray(value)) {
            return (
              acc +
              value.reduce((accQuery: string, curValue: string) => {
                if (type === 'FILTER_BAR' && curValue.match(engReg)) return `${accQuery} ${key}:${curValue}`;
                if (type === 'QUERY' && key === 'no') return `${accQuery} ${curValue}:""`;

                return `${accQuery} ${key}:"${curValue}"`;
              }, '')
            );
          }

          if (typeof value === 'string' && value) {
            if (key === 'is' && value === 'all') return acc;
            if (type === 'FILTER_BAR' && (value.match(engReg) || value === '@me')) return `${acc} ${key}:${value}`;
            if (type === 'QUERY' && value === '@me') return `${acc} ${key}:"${userInfo.nickname}"`;

            return `${acc} ${key}:"${value}"`;
          }

          return acc;
        }, '')
        .trim();

    const filterBarState = defineFilterString('FILTER_BAR');
    const filterQueryString = defineFilterString('QUERY');
    const queries =
      filterQueryString
        .match(parsingFilterReg)
        ?.map((e) => encodeURIComponent(e))
        .join('+') || '';

    return { isFiltering, page, filterBarState, queries };
  },
});
