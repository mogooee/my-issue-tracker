/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CheckBox from '@/components/Atoms/CheckBox';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem, { IssueInfoTypes } from '@/components/Molecules/IssueItem';
import Dropdown from '@/components/Molecules/Dropdown';
import { CheckState, IssueTableCheckState } from '@/stores/checkBox';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import { DropdownTypes } from '@/components/Molecules/Dropdown/types';
import { OPEN_CLOSE_DROPDOWN_ARGS } from '@/components/Molecules/Dropdown/mocks';
import Table from '@/components/Molecules/Table';
import { openCloseIssue } from '@/components/Molecules/NavLink/option';

interface IssueTableTypes {
  issueListData: IssueInfoTypes[];
  filterTabs: DropdownTypes[];
}

const IssueTable = ({ issueListData, filterTabs }: IssueTableTypes) => {
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const { checkedIssueNum } = useRecoilValue(IssueTableCheckState);
  const [openIssueNum, closeIssueNum] = [2, 3];

  useEffect(() => {
    setCheckState({ ...checkState, child: Array.from({ length: issueListData.length }, () => false) });
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
              <NavLink navData={openCloseIssue(openIssueNum, closeIssueNum)} />
            )}
          </S.IssueStates>
          <S.IssueInfoTabs>
            {checkedIssueNum ? (
              <Dropdown {...OPEN_CLOSE_DROPDOWN_ARGS} />
            ) : (
              filterTabs.map((info) => <Dropdown key={info.panelTitle} {...info} />)
            )}
          </S.IssueInfoTabs>
        </S.IssueTableHeader>
      }
      item={issueListData.map((props) => (
        <IssueItem key={props.id} issueInfo={props} />
      ))}
    />
  );
};

export default IssueTable;
