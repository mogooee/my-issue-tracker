/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CheckBox from '@/components/Atoms/CheckBox';
import Icon from '@/components/Atoms/Icon';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem, { IssueInfoTypes } from '@/components/Molecules/IssueItem';
import Dropdown from '@/components/Molecules/Dropdown';
import { CheckState, IssueTableCheckState } from '@/stores/checkBox';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import { DropdownTypes } from '@/components/Molecules/Dropdown/types';
import { OPEN_CLOSE_DROPDOWN_ARGS } from '@/components/Molecules/Dropdown/mocks';
import Table from '@/components/Molecules/Table';

interface IssueTableTypes {
  issueListData: IssueInfoTypes[];
  filterTabs: DropdownTypes[];
}

const openCloseIssue = (openIssueNum: number, closeIssueNum: number) => [
  {
    icon: <Icon icon="AlertCircle" stroke="#007AFF" />,
    title: `열린 이슈 (${openIssueNum})`,
    link: '/issues/open',
  },
  {
    icon: <Icon icon="Archive" stroke="#0025E7" />,
    title: `닫힌 이슈 (${closeIssueNum})`,
    link: '/issues/close',
  },
];

const HEADER_COLUMNS = '60px 500px auto';

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
        <>
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
        </>
      }
      headerTemplateColumns={HEADER_COLUMNS}
      item={issueListData.map((props) => (
        <IssueItem key={props.id} issueInfo={props} />
      ))}
    />
  );
};

export default IssueTable;
