import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import useFetchIssue from '@/api/issue/useFetchIssue';
import { OPEN_QUERY } from '@/hooks/useFilter';
import { FilterState, PageState } from '@/stores/filter';

import IssuesNavInline from '@/pages/Private/Issues/NavInline';
import IssueTable from '@/components/Organisms/IssueTable';
import Paginiation from '@/components/Organisms/Pagination';
import SkeletonIssueTable from '@/components/Skeleton/IssueTable';

const Issues = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;
  const queriesParams = searchParams.get('q') || '';
  const queries = document.location.search ? queriesParams : OPEN_QUERY;

  const { useIssuesData } = useFetchIssue();
  const { data: issues } = useIssuesData(page, queries);

  const setFilterState = useSetRecoilState(FilterState);
  const setPageState = useSetRecoilState(PageState);

  useEffect(() => {
    setFilterState(queries);
  }, [queries]);

  useEffect(() => {
    setPageState(page);
  }, [page]);

  return (
    <>
      <IssuesNavInline />
      <IssueTable issuesData={issues!} />
      {!!issues!.issues.content.length && <Paginiation totalPages={issues!.issues.totalPages} currentPage={page} />}
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
