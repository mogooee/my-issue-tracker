import { useSearchParams } from 'react-router-dom';

import styled from 'styled-components';
import { COLORS } from '@/styles/theme';

import Icon from '@/components/Atoms/Icon';
import Button from '@/components/Atoms/Button';

import FilterBar from '@/components/Molecules/FilterBar';
import { FILTERBAR_INFO } from '@/components/Molecules/FilterBar/mocks';
import { FILTER_TABS_INFO as FILTER_TABS } from '@/components/Molecules/Dropdown/mock';
import NavLink from '@/components/Molecules/NavLink';
import IssueTable from '@/components/Organisms/IssueTable';

import useFetchIssue from '@/api/issue/useFetchIssue';

const DivContainer = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 24px;
`;

const SubNav = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  button {
    margin-left: 16px;
  }
`;

const Issues = () => {
  const { issues } = useFetchIssue();

  const [searchParams] = useSearchParams();

  const definedIssueState = () => {
    const queries = searchParams.get('q')?.split('+');

    if (queries?.find((query) => query.includes('is:open'))) {
      return 'OPEN';
    }
    if (queries?.find((query) => query.includes('is:closed'))) {
      return 'CLOSED';
    }
    return 'ALL';
  };

  const issueState = definedIssueState();

  return (
    <>
      <DivContainer>
        <FilterBar {...FILTERBAR_INFO} />
        <SubNav>
          <NavLink
            navData={[
              { icon: <Icon icon="Tag" stroke={COLORS.TITLE_ACTIVE} />, title: '레이블 (3)', link: '/labels' },
              {
                icon: <Icon icon="Milestone" fill={COLORS.TITLE_ACTIVE} />,
                title: '마일스톤 (2)',
                link: '/milestones',
              },
            ]}
            navLinkStyle="LINE"
          />
          <Button
            buttonStyle="STANDARD"
            label="이슈작성"
            size="SMALL"
            iconInfo={{ icon: 'Plus', stroke: COLORS.OFF_WHITE }}
          />
        </SubNav>
      </DivContainer>
      <IssueTable issues={issues!} filterTabs={FILTER_TABS} issueState={issueState} />
    </>
  );
};

export default Issues;
