import { FILTERBAR_INFO_TYPES } from '@/components/Molecules/FilterBar';
import { ISSUE_FILTER_LIST } from '@/components/Molecules/Dropdown/mock';

export const FILTERBAR_INFO: FILTERBAR_INFO_TYPES = {
  DROPDOWN: {
    indicatorProps: {
      indicatorLabel: '필터',
      indicatorStyle: 'FILTERBAR',
    },
    type: 'List',
    panelProps: {
      panelId: 'issue',
      panelTitle: '체크박스 필터',
      panelType: 'radio',
      panelList: ISSUE_FILTER_LIST,
    },
  },
  INPUT: {
    placeholder: 'Search all issues',
    defaultValue: 'is:issue is:open',
  },
};
