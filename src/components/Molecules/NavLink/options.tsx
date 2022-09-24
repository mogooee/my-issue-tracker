import Icon from '@/components/Atoms/Icon';
import { CLOSED_QUERY, OPEN_QUERY, URLIssueStateReg } from '@/hooks/useFilter';
import { COLORS } from '@/styles/theme';

export const labelMilestone = (labelsNum?: number, milestonesNum?: number) => {
  const labelTitle = labelsNum ? `레이블(${labelsNum})` : '레이블';
  const milestoneTitle = milestonesNum ? `마일스톤 (${milestonesNum})` : '마일스톤';

  return [
    {
      icon: <Icon icon="Tag" stroke={COLORS.TITLE_ACTIVE} />,
      link: '/labels',
      title: labelTitle,
    },
    {
      icon: <Icon fill={COLORS.TITLE_ACTIVE} icon="Milestone" />,
      link: '/milestones',
      title: milestoneTitle,
    },
  ];
};

export const openCloseIssue = (openIssueNum: number, closedIssueNum: number, page: number, queryString: string) => {
  const pageQuery = `/issues?page=${page}`;
  const filterIssueStateQuery = queryString.replace(URLIssueStateReg, '');
  return [
    {
      dataId: 'is:open',
      icon: <Icon icon="AlertCircle" stroke={COLORS.PRIMARY.BLUE} />,
      title: `열린 이슈 (${openIssueNum})`,
      link: `${pageQuery}&q=${encodeURIComponent(OPEN_QUERY)}${filterIssueStateQuery}`,
    },
    {
      dataId: 'is:closed',
      icon: <Icon icon="Archive" stroke={COLORS.SECONDORY.PURPLE} />,
      title: `닫힌 이슈 (${closedIssueNum})`,
      link: `${pageQuery}&q=${encodeURIComponent(CLOSED_QUERY)}${filterIssueStateQuery}`,
    },
  ];
};
