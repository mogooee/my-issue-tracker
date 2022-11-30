import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
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
import Paginiation from '@/components/Organisms/Pagination';

const Issues = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const pageParams = Number(searchParams.get('page')) || 0;
  const queriesParams = searchParams.get('q');
  const filterState = useRecoilValue(FilterState);
  const resetFilterState = useResetRecoilState(FilterState);
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
    resetFilterState();

    setIssueState(queriesParams);

    const queriesArr = queriesParams?.match(parsingFilterReg);
    queriesArr?.forEach((query) => {
      setParsingFilterState(query);
    });
  };

  // 쿼리가 변경되면 해당하는 결과로 이동한다.
  useEffect(() => {
    if (!document.location.search && filterState === initFilterState) return;
    navigate(`/issues?page=${page}&q=${queries}`);
  }, [queries]);

  useEffect(() => {
    setPageState(pageParams);

    // 뒤로가기 시 url의 쿼리와 FilterState를 일치시킨다.
    if (decodeURIComponent(queries).replaceAll('+', ' ') !== decodeURIComponent(queriesParams!)) {
      setURLQueriesToFilterState();
    }
    // 이전 페이지가 루트인 경우 FilterState를 초기화한다.
    if (!queriesParams && !pageParams) {
      resetFilterState();
    }
  }, [queriesParams]);

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
      {!!issues!.issues.content.length && (
        <Paginiation totalPages={issues!.issues.totalPages} currentPage={pageParams} />
      )}
    </>
  );
};

export default Issues;
