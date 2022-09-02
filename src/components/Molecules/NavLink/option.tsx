import Icon from '@/components/Atoms/Icon';

export const labelMilestone = [
  {
    icon: <Icon icon="Tag" stroke="#14142B" />,
    link: '/label',
    title: '레이블',
  },
  {
    icon: <Icon fill="#14142B" icon="Milestone" />,
    link: '/milestone',
    title: '마일스톤',
  },
];

export const openCloseIssue = (openIssueNum: number, closeIssueNum: number) => [
  {
    icon: <Icon icon="AlertCircle" stroke="#007AFF" />,
    title: `열린 이슈 (${openIssueNum})`,
    link: '/issues/open',
  },
  {
    icon: <Icon icon="Archive" stroke="#0025E7" />,
    title: `닫힌 이슈 (${closeIssueNum})`,
    link: '/issues/close',
  },
];
