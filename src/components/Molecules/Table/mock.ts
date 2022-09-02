import { LabelTypes } from '@/stores/labelList';

export const labelContents: LabelTypes[] = [
  {
    id: 1,
    title: 'Feature',
    backgroundColorCode: '#d4c5f9',
    description: '기능 개발용 라벨입니다.',
    textColor: 'BLACK',
  },
  {
    id: 2,
    title: 'Docs',
    backgroundColorCode: '#d4c510',
    description: '문서 추가용 라벨입니다.',
    textColor: 'WHITE',
  },
  {
    id: 3,
    title: 'Bugs',
    backgroundColorCode: '#d4c505',
    description: '버그 수정용 라벨입니다.',
    textColor: 'BLACK',
  },
  {
    id: 4,
    title: 'Question',
    backgroundColorCode: '#d4c501',
    description: '질문용 라벨입니다.',
    textColor: 'WHITE',
  },
];
