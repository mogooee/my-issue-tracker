import { Suspense, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useFetchIssue from '@/api/issue/useFetchIssue';
import IssuesNavInline from '@/pages/Private/Issues/NavInline';
import IssueTable from '@/components/Organisms/IssueTable';

import { FilterState, FilterStatsState, initFilterState, PageState } from '@/stores/filter';

import useFilter, { parsingFilterReg } from '@/hooks/useFilter';
import Paginiation from '@/components/Organisms/Pagination';
import SkeletonIssueTable from '@/components/Skeleton/IssueTable';

const Issues = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const pageParams = Number(searchParams.get('page')) || 0;
  const queriesParams = searchParams.get('q');

  const filterState = useRecoilValue(FilterState);
  const resetFilterState = useResetRecoilState(FilterState);
  const { page, queries } = useRecoilValue(FilterStatsState);
  const setPageState = useSetRecoilState(PageState);

  const { useIssuesData } = useFetchIssue();
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
      <IssuesNavInline />
      <IssueTable issuesData={issues!} />
      {!!issues!.issues.content.length && (
        <Paginiation totalPages={issues!.issues.totalPages} currentPage={pageParams} />
      )}
    </>
  );
};

const fallbackIssues = () => (
  <Suspense
    fallback={
      <>
        <IssuesNavInline />
        <SkeletonIssueTable />
      </>
    }
  >
    <Issues />
  </Suspense>
);

export default fallbackIssues;
