/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CheckState, DefaultCheckIds } from '@/stores/checkBox';

import CheckBox from '@/components/Atoms/CheckBox';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem from '@/components/Organisms/IssueTable/IssueItem';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import Table from '@/components/Molecules/Table';

import { IssuesTypes } from '@/api/issue/types';
import { FilterStatsState } from '@/stores/filter';
import { openCloseIssue } from '@/components/Molecules/NavLink/options';
import useFilter, { OPEN_QUERY } from '@/hooks/useFilter';

import CustomErrorBoundary from '@/components/ErrorBoundary';
import TableInfoTabs from '@/components/Organisms/IssueTable/TableInfoTabs';
import ErrorInfoTabs from '@/components/Organisms/IssueTable/TableInfoTabs/Error';

const PARENT_CHECKBOX_ID = -1;

const IssueTable = ({ issuesData }: { issuesData: IssuesTypes }) => {
  const { openIssueCount, closedIssueCount, issues } = issuesData;

  const checkState = useRecoilValue(CheckState);
  const setDefaultCheckIds = useSetRecoilState(DefaultCheckIds);
  const checkedBoxNum = checkState.child.length;

  const { page, queries } = useRecoilValue(FilterStatsState);

  const { setParsingFilterState } = useFilter();

  const handleOnOpenClosedNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedNavDataId = event.currentTarget.dataset.id;
    setParsingFilterState(clickedNavDataId!);
  };

  useEffect(() => {
    const ids: number[] = issues.content.map((issue) => issue.id);
    setDefaultCheckIds(ids);
  }, [issues.content.length]);

  return (
    <Table
      header={
        <S.IssueTableHeader>
          <CheckBox id={PARENT_CHECKBOX_ID} type="parent" checked={checkState.parent} />
          <S.IssueStates>
            {checkedBoxNum ? (
              <span>{`${checkedBoxNum}개 이슈 선택`}</span>
            ) : (
              <NavLink
                navData={openCloseIssue(openIssueCount, closedIssueCount, page, queries)}
                handleOnClick={handleOnOpenClosedNavClick}
                defaultActive={OPEN_QUERY}
              />
            )}
          </S.IssueStates>
          <CustomErrorBoundary
            fallbackRender={({ resetState, errorCode }) => (
              <ErrorInfoTabs resetState={resetState} errorCode={errorCode} />
            )}
          >
            <TableInfoTabs />
          </CustomErrorBoundary>
        </S.IssueTableHeader>
      }
      item={
        issues.content.length
          ? issues.content.map((itemProps) => <IssueItem key={itemProps.id} {...itemProps} />)
          : [<S.NoSearchResult>No results matched your search. 👀</S.NoSearchResult>]
      }
    />
  );
};

export default IssueTable;
