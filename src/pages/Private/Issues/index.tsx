import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useFetchIssue from '@/api/issue/useFetchIssue';

import * as S from '@/pages/Private/Issues/index.styled';

import Button from '@/components/Atoms/Button';
import FilterBar from '@/components/Molecules/FilterBar';
import NavLink from '@/components/Molecules/NavLink';
import IssueTable from '@/components/Organisms/IssueTable';

import { FILTERBAR_INFO } from '@/components/Molecules/FilterBar/mocks';
import {
  ASSIGNEE_DROPDOWN_ARGS,
  AUTHOR_DROPDOWN_ARGS,
  LABEL_DROPDOWN_ARGS,
  MILESTONE_DROPDOWN_ARGS,
} from '@/components/Molecules/Dropdown/mock';
import { NEW_ISSUE_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { FilterState, FilterStatsState, initFilterState, PageState } from '@/stores/filter';
import useFetchLabel from '@/api/label/useFetchLabel';
import useFetchMilestone from '@/api/milestone/useFetchMilestone';
import useFetchSideBarData from '@/api/useFetchSideBarData';
import useFilter, { parsingFilterReg } from '@/hooks/useFilter';
import { labelMilestone } from '@/components/Molecules/NavLink/options';

const Issues = () => {
  const naviagate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParams = Number(searchParams.get('page')) || 0;
  const queriesParams = searchParams.get('q');
  const filterState = useRecoilValue(FilterState);
  const { page, queries } = useRecoilValue(FilterStatsState);
  const setPageState = useSetRecoilState(PageState);

  const { labelData } = useFetchLabel();
  const { milestoneData } = useFetchMilestone();
  const { memberData } = useFetchSideBarData();
  const { useIssuesData } = useFetchIssue();

  const { data: issues } = useIssuesData(pageParams, queriesParams);

  const { setIssueState, setParsingFilterState } = useFilter();

  const filterTabs = [
    ASSIGNEE_DROPDOWN_ARGS(memberData!),
    LABEL_DROPDOWN_ARGS(labelData!),
    MILESTONE_DROPDOWN_ARGS(milestoneData?.openedMilestones!),
    AUTHOR_DROPDOWN_ARGS(memberData!),
  ];

  const setURLQueriesToFilterState = () => {
    if (!document.location.search) return;

    setIssueState(queriesParams);

    const queriesArr = queriesParams?.match(parsingFilterReg);
    queriesArr?.forEach((query) => {
      setParsingFilterState(query);
    });
  };

  useEffect(() => {

    naviagate(`/issues?page=${page}&q=${quries}`);
  }, [quries]);

  useEffect(() => {
    setPageState(pageParams);
    setURLQueriesToFilterState();
  }, []);

  return (
    <>
      <S.NavInline>
        <FilterBar {...FILTERBAR_INFO} />
        <S.SubNav>
          <NavLink
            navData={labelMilestone(labelData!.length, milestoneData!.openedMilestones.length)}
            navLinkStyle="LINE"
          />
          <Link to="/issues/new">
            <Button {...NEW_ISSUE_BUTTON_INFO.WRITE} />
          </Link>
        </S.SubNav>
      </S.NavInline>
      <IssueTable issuesData={issues!} filterTabs={filterTabs} />
    </>
  );
};

export default Issues;
