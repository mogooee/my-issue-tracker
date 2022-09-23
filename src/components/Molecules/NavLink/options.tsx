import Icon from '@/components/Atoms/Icon';
import { COLORS } from '@/styles/theme';

export const labelMilestone = (labelsNum?: number, milestonesNum?: number) => [
  {
    icon: <Icon icon="Tag" stroke={COLORS.TITLE_ACTIVE} />,
    link: `/labels ${labelsNum}`,
    title: '레이블',
  },
  {
    icon: <Icon fill={COLORS.TITLE_ACTIVE} icon="Milestone" />,
    link: `/milestones ${milestonesNum}`,
    title: '마일스톤',
  },
];

const filterStateReg = /(is%3A%22)(closed|open)%22/g;

export const openCloseIssue = (openIssueNum: number, closedIssueNum: number, page: number, queryString: string) => {
  const pageQuery = `/issues?page=${page}`;
  const filterStateQuery = queryString.replace(filterStateReg, '');
  return [
    {
      dataId: 'is:open',
      icon: <Icon icon="AlertCircle" stroke={COLORS.PRIMARY.BLUE} />,
      title: `열린 이슈 (${openIssueNum})`,
      link: `${pageQuery}&q=${encodeURIComponent('is:"open"')}${filterStateQuery}`,
    },
    {
      dataId: 'is:closed',
      icon: <Icon icon="Archive" stroke={COLORS.SECONDORY.PURPLE} />,
      title: `닫힌 이슈 (${closedIssueNum})`,
      link: `${pageQuery}&q=${encodeURIComponent('is:"closed"')}${filterStateQuery}`,
    },
  ];
};
