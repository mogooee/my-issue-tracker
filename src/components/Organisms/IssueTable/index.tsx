/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CheckBox from '@/components/Atoms/CheckBox';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem from '@/components/Organisms/IssueTable/IssueItem';
import Dropdown from '@/components/Molecules/Dropdown';
import { CheckState, IssueTableCheckState } from '@/stores/checkBox';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import { DropdownTypes, ListPanelTypes } from '@/components/Molecules/Dropdown/types';
import { OPEN_CLOSE_DROPDOWN_ARGS } from '@/components/Molecules/Dropdown/mock';
import Table from '@/components/Molecules/Table';
import { openCloseIssue } from '@/components/Molecules/NavLink/options';
import { ContentTypes, IssuesTypes } from '@/api/issue/types';

type IssueStateType = 'ALL' | 'OPEN' | 'CLOSED';

interface IssueTableTypes {
  issues: IssuesTypes;
  filterTabs: DropdownTypes<ListPanelTypes>[];
  issueState: IssueStateType;
}

const IssueTable = ({ issues, filterTabs, issueState }: IssueTableTypes) => {
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const { checkedIssueNum } = useRecoilValue(IssueTableCheckState);
  const { openIssueCount, openIssues, closedIssueCount, closedIssues } = issues;

  const definedItem = (state: IssueStateType): [ContentTypes[], number] => {
    if (state === 'OPEN') {
      return [openIssues.content, openIssueCount];
    }
    if (state === 'CLOSED') {
      return [closedIssues.content, closedIssueCount];
    }
    return [[...openIssues.content, ...closedIssues.content], openIssueCount + closedIssueCount];
  };

  const [items, itemsCount] = definedItem(issueState);

  useEffect(() => {
    setCheckState({
      ...checkState,
      child: Array.from({ length: itemsCount }, () => false),
    });
  }, []);

  return (
    <Table
      header={
        <S.IssueTableHeader>
          <CheckBox id={-1} type="parent" checked={checkState.parent} />
          <S.IssueStates>
            {checkedIssueNum ? (
              <span>{`${checkedIssueNum}개 이슈 선택`}</span>
            ) : (
              <NavLink navData={openCloseIssue(openIssueCount, closedIssueCount)} />
            )}
          </S.IssueStates>
          <S.IssueInfoTabs>
            {checkedIssueNum ? (
              <Dropdown {...OPEN_CLOSE_DROPDOWN_ARGS} />
            ) : (
              filterTabs.map((info) => <Dropdown key={info.panelProps.panelTitle} {...info} />)
            )}
          </S.IssueInfoTabs>
        </S.IssueTableHeader>
      }
      item={items.map((itemProps) => (
        <IssueItem key={itemProps.id} {...itemProps} />
      ))}
    />
  );
};

export default IssueTable;
