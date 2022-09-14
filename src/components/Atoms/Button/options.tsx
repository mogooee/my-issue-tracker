import { ButtonTypes } from '@/components/Atoms/Button';
import { COLORS } from '@/styles/theme';

export interface BUTTON_PROPS_TYPES {
  [key: string]: ButtonTypes;
}

export const BUTTON_PROPS: BUTTON_PROPS_TYPES = {
  ADD: {
    label: '추가',
    size: 'SMALL',
    buttonStyle: 'STANDARD',
    iconInfo: {
      icon: 'Plus',
      stroke: COLORS.OFF_WHITE,
    },
  },
  CLOSE: {
    label: '닫기',
    size: 'SMALL',
    buttonStyle: 'SECONDARY',
    iconInfo: {
      icon: 'XSquare',
      stroke: COLORS.PRIMARY.BLUE,
    },
  },
  SAVE: {
    label: '완료',
    size: 'SMALL',
    buttonStyle: 'STANDARD',
    iconInfo: {
      icon: 'Plus',
      stroke: COLORS.OFF_WHITE,
    },
  },
  CANCEL: {
    label: '취소',
    size: 'SMALL',
    buttonStyle: 'SECONDARY',
    iconInfo: {
      icon: 'XSquare',
      stroke: COLORS.PRIMARY.BLUE,
    },
  },
};

export const TABLE_ITEM_BUTTON_INFO: BUTTON_PROPS_TYPES = {
  MILESTONE_OPEN: {
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

export const NEW_ISSUE_BUTTON_INFO: BUTTON_PROPS_TYPES = {
  WRITE: {
    buttonStyle: 'STANDARD',
    label: '이슈 작성',
    size: 'SMALL',
    iconInfo: { icon: 'Plus', stroke: COLORS.OFF_WHITE },
  },
  CANCEL: {
    buttonStyle: 'NO_BORDER',
    iconInfo: { icon: 'XSquare' },
    label: '작성 취소',
    size: 'SMALL',
  },
  COMPLETE: {
    buttonStyle: 'STANDARD',
    label: '완료',
    size: 'MEDIUM',
  },
};

export const MODAL_BUTTON_INFO: BUTTON_PROPS_TYPES = {
  YES: {
    buttonStyle: 'STANDARD',
    label: '확인',
    size: 'SMALL',
  },
  NO: {
    buttonStyle: 'STANDARD',
    label: '취소',
    size: 'SMALL',
  },
  TO_MAIN: {
    buttonStyle: 'STANDARD',
    label: '메인으로',
    size: 'LARGE',
  },
};
