import Icon from '@/components/Atoms/Icon';
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

export const NAV_DATA = [
  {
    icon: <Icon icon="Tag" stroke="#14142B" />,
    link: '/label',
    title: '레이블',
  },
  {
    icon: <Icon icon="Milestone" fill="#14142B" />,
    link: '/milestone',
    title: '마일스톤',
  },
];
