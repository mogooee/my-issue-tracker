import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';
import useFetchIssue from '@/api/issue/useFetchIssue';
import { CheckState } from '@/stores/checkBox';

import * as S from '@/pages/Private/Issues/index.styled';
import { COLORS } from '@/styles/theme';

import Icon from '@/components/Atoms/Icon';
import Button from '@/components/Atoms/Button';
import FilterBar from '@/components/Molecules/FilterBar';
import NavLink from '@/components/Molecules/NavLink';
import IssueTable from '@/components/Organisms/IssueTable';

import { FILTERBAR_INFO } from '@/components/Molecules/FilterBar/mocks';
import { FILTER_TABS_INFO as FILTER_TABS } from '@/components/Molecules/Dropdown/mock';
import { NEW_ISSUE_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { FilterState, FilterStatsState, PageState } from '@/stores/filter';
import useFetchLabel from '@/api/label/useFetchLabel';
import useFetchMilestone from '@/api/milestone/useFetchMilestone';

const Issues = () => {
  const [searchParams] = useSearchParams();
  const quriesParams = searchParams.get('q') || '';
  const pageParams = Number(searchParams.get('page')) || 0;
  const [filterState, setFilterState] = useRecoilState(FilterState);
  const setPageState = useSetRecoilState(PageState);
  const setCheckState = useSetRecoilState(CheckState);

  const { labelData } = useFetchLabel();
  const { milestoneData } = useFetchMilestone();
  const { useIssuesData } = useFetchIssue();
  const { data: issues } = useIssuesData(pageParams, quriesParams);

  useEffect(() => {
    setCheckState((checkState) => ({ ...checkState, issueState: filterState.is }));
  }, [filterState.state]);


  const [searchParams] = useSearchParams();
  const setCheckState = useSetRecoilState(CheckState);
  const queries = searchParams.get('q')?.split('+')!;
  const issueState = definedIssueState(queries);

  useEffect(() => {
    setPageState(pageParams);
    if (quriesParams) {
      const queriesArr = quriesParams.split(' ');
      queriesArr.forEach((qurey) => {
        const [key, value] = qurey.split(':');
        const filterValue = value.replace(/(^"|"$)/g, '');
        setFilterState((prev) => {
          if (!filterValue) return { ...prev, no: [...prev.no, key as 'label' | 'milestone' | 'assignee'] };

          const newValue = key === 'label' ? [...prev[key], filterValue] : filterValue;
          return { ...prev, [key]: newValue };
        });
      });
    }
  }, []);

  return (
    <>
      <S.NavInline>
        <FilterBar {...FILTERBAR_INFO} />
        <S.SubNav>
          <NavLink
            navData={[
              {
                icon: <Icon icon="Tag" stroke={COLORS.TITLE_ACTIVE} />,
                title: `레이블 (${labelData!.length})`,
                link: '/labels',
              },
              {
                icon: <Icon icon="Milestone" fill={COLORS.TITLE_ACTIVE} />,
                title: `마일스톤 (${milestoneData!.openedMilestones.length})`,
                link: '/milestones',
              },
            ]}
            navLinkStyle="LINE"
          />
          <Link to="/issues/new">
            <Button {...NEW_ISSUE_BUTTON_INFO.WRITE} />
          </Link>
        </S.SubNav>
      </S.NavInline>
      <IssueTable issues={issues!} filterTabs={FILTER_TABS} issueState={filterState.is} />
    </>
  );
};

export default Issues;
