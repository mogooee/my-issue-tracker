import { COLORS } from '@/styles/theme';
import { FILTERBAR_INFO_TYPES } from '@/components/Molecules/FilterBar';
import { ISSUE_FILTER_LIST } from '@/components/Molecules/Dropdown/mock';
import { ButtonTypes } from '@/components/Atoms/Button';

export const FILTERBAR_INFO: FILTERBAR_INFO_TYPES = {
  DROPDOWN: {
    indicatorProps: {
      indicatorLabel: '필터',
      indicatorStyle: 'FILTERBAR',
    },
    type: 'List',
    panelProps: {
      panelId: 'issue',
      panelTitle: '이슈 필터',
      panelType: 'checkbox',
      panelList: ISSUE_FILTER_LIST,
    },
  },
  INPUT: {
    inputSize: 'MEDIUM',
    inputType: 'text',
    inputMaxLength: 100,
    inputPlaceholder: 'Search all issues',
  },
};

export const FILTERBAR_CLEAR_BUTTON_PROPS: ButtonTypes = {
  buttonStyle: 'NO_BORDER',
  iconInfo: { icon: 'XSquare', stroke: COLORS.OFF_WHITE },
  label: 'Clear current search query and filters',
  size: 'SMALL',
};
