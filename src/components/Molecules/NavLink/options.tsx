import Icon from '@/components/Atoms/Icon';
import { CLOSED_QUERY, OPEN_QUERY } from '@/hooks/useFilter';
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
  const stateReg = /is:\w+/g;
  const queries = (state: string) =>
    stateReg.test(queryString) ? queryString.replace(stateReg, state) : `${state} ${queryString}`;

  return [
    {
      dataId: OPEN_QUERY,
      icon: <Icon icon="AlertCircle" stroke={COLORS.PRIMARY.BLUE} />,
      title: `열린 이슈 (${openIssueNum})`,
      link: `${pageQuery}&q=${queries(OPEN_QUERY)}`,
    },
    {
      dataId: CLOSED_QUERY,
      icon: <Icon icon="Archive" stroke={COLORS.SECONDORY.PURPLE} />,
      title: `닫힌 이슈 (${closedIssueNum})`,
      link: `${pageQuery}&q=${queries(CLOSED_QUERY)}`,
    },
  ];
};
