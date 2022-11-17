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
import { NEW_ISSUE_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { FilterState, FilterStatsState, initFilterState, PageState } from '@/stores/filter';

import useFetchLabel from '@/api/label/useFetchLabel';
import useFetchMilestone from '@/api/milestone/useFetchMilestone';

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

  const { useLabelData } = useFetchLabel();
  const { milestoneData } = useFetchMilestone();
  const { useIssuesData } = useFetchIssue();

  const { data: labelData } = useLabelData();
  const { data: issues } = useIssuesData(pageParams, queriesParams);

  const { setIssueState, setParsingFilterState } = useFilter();

  const setURLQueriesToFilterState = () => {
    if (!document.location.search) return;

    setIssueState(queriesParams);

    const queriesArr = queriesParams?.match(parsingFilterReg);
    queriesArr?.forEach((query) => {
      setParsingFilterState(query);
    });
  };

  useEffect(() => {
    if (!document.location.search && filterState === initFilterState) return;

    naviagate(`/issues?page=${page}&q=${queries}`);
  }, [queries]);

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
      <IssueTable issuesData={issues!} milestoneData={milestoneData!} labelData={labelData!} />
    </>
  );
};

export default Issues;
