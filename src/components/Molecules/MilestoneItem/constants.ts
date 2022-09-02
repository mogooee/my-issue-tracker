import { BUTTON_PROPS_TYPES } from '@/pages/Private/Milestones/constants';
import { COLORS } from '@/styles/theme';

export const MILESTONE_BUTTON_INFO: BUTTON_PROPS_TYPES = {
  OPEN: {
    buttonStyle: 'NO_BORDER',
    iconInfo: { icon: 'Milestone', fill: COLORS.TITLE_ACTIVE },
    label: '열기',
    size: 'SMALL',
  },
  CLOSE: {
    buttonStyle: 'NO_BORDER',
    iconInfo: { icon: 'Archive' },
    label: '닫기',
    size: 'SMALL',
  },
  MODIFY: {
    buttonStyle: 'NO_BORDER',
    iconInfo: { icon: 'Edit' },
    label: '편집',
    size: 'SMALL',
  },
  DELETE: {
    buttonStyle: 'NO_BORDER',
    iconInfo: { icon: 'Trash', stroke: COLORS.ERROR.RED },
    label: '삭제',
    size: 'SMALL',
  },
};
