/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CheckState, DefaultCheckIds } from '@/stores/checkBox';

import CheckBox from '@/components/Atoms/CheckBox';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem from '@/components/Organisms/IssueTable/IssueItem';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import Table from '@/components/Molecules/Table';

import { IssuesTypes } from '@/api/issue/types';
import { openCloseIssue } from '@/components/Molecules/NavLink/options';
import { OPEN_QUERY } from '@/hooks/useFilter';

import ErrorBoundary from '@/components/ErrorBoundary';
import TableInfoTabs from '@/components/Organisms/IssueTable/TableInfoTabs';
import ErrorInfoTabs from '@/components/Organisms/IssueTable/TableInfoTabs/Error';
import { FilterState, PageState } from '@/stores/filter';

const PARENT_CHECKBOX_ID = -1;

const EmptyIssueItem = () => <S.NoSearchResult>해당하는 이슈가 없습니다. 👀</S.NoSearchResult>;

const IssueTable = ({ issuesData }: { issuesData: IssuesTypes }) => {
  const navigate = useNavigate();
  const { openIssueCount, closedIssueCount, issues } = issuesData;

  const checkState = useRecoilValue(CheckState);
  const setDefaultCheckIds = useSetRecoilState(DefaultCheckIds);
  const checkedBoxNum = checkState.child.length;

  const page = useRecoilValue(PageState);
  const queries = useRecoilValue(FilterState);

  useEffect(() => {
    if (page > 0 && !issues.content.length) {
      navigate(`/issues?page=${page - 1}&q=${queries}`);
    }

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
                defaultActive={OPEN_QUERY}
              />
            )}
          </S.IssueStates>
          <ErrorBoundary
            resetKeys={['IssueTab']}
            fallbackRender={({ resetErrorBoundary, errorCode }) => (
              <ErrorInfoTabs resetState={resetErrorBoundary} errorCode={errorCode} />
            )}
          >
            <TableInfoTabs />
          </ErrorBoundary>
        </S.IssueTableHeader>
      }
      item={
        issues.content.length
          ? issues.content.map((itemProps) => <IssueItem key={itemProps.id} {...itemProps} />)
          : [<EmptyIssueItem />]
      }
    />
  );
};

export default IssueTable;
