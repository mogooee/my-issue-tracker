import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

export const labelMilestone = [
  {
    icon: <Icon icon="Tag" stroke={COLORS.TITLE_ACTIVE} />,
    link: '/labels',
    title: '레이블',
  },
  {
    icon: <Icon fill={COLORS.TITLE_ACTIVE} icon="Milestone" />,
    link: '/milestones',
    title: '마일스톤',
  },
];

export const openCloseIssue = (openIssueNum: number, closedIssueNum: number) => [
  {
    icon: <Icon icon="AlertCircle" stroke={COLORS.PRIMARY.BLUE} />,
    title: `열린 이슈 (${openIssueNum})`,
    link: '/issues?q=+is%3Aopen+',
  },
  {
    icon: <Icon icon="Archive" stroke={COLORS.SECONDORY.PURPLE} />,
    title: `닫힌 이슈 (${closedIssueNum})`,
    link: '/issues?q=+is%3Aclosed+',
  },
];
