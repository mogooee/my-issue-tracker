import { BUTTON_PROPS_TYPES } from '@/components/Atoms/Button/options';
import { COLORS } from '@/styles/theme';

export const ISSUE_DETAIL_BUTTON_PROPS: BUTTON_PROPS_TYPES = {
  EDIT: {
    label: '제목 편집',
    size: 'SMALL',
    buttonStyle: 'SECONDARY',
    iconInfo: {
      icon: 'Edit',
      stroke: COLORS.OFF_WHITE,
    },
  },
  OPEN: {
    label: '다시 열기',
    size: 'SMALL',
    buttonStyle: 'SECONDARY',
    iconInfo: {
      icon: 'AlertCircle',
      stroke: COLORS.PRIMARY.BLUE,
    },
  },
  CLOSE: {
    label: '이슈 닫기',
    size: 'SMALL',
    buttonStyle: 'SECONDARY',
    iconInfo: {
      icon: 'Archive',
      stroke: COLORS.PRIMARY.BLUE,
    },
  },
};
