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

interface IssueTableTypes {
  issueListData: IssueInfoTypes[];
  filterTabs: DropdownTypes[];
}

const openCloseIssue = [
  {
    icon: <Icon icon="AlertCircle" stroke="#007AFF" />,
    title: '열린 이슈',
    link: '/issues/open',
  },
  {
    icon: <Icon icon="Archive" stroke="#0025E7" />,
    title: '닫힌 이슈',
    link: '/issues/close',
  },
];

const IssueTable = ({ issueListData, filterTabs }: IssueTableTypes) => {
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const { checkedIssueNum } = useRecoilValue(IssueTableCheckState);

  useEffect(() => {
    setCheckState({ ...checkState, child: Array.from({ length: issueListData.length }, () => false) });
  }, []);

  return (
    <S.StyledIssueTable>
      <S.IssueHeader>
        <CheckBox id={-1} type="parent" checked={checkState.parent} />
        <S.IssueStates>
          {checkedIssueNum ? <span>{`${checkedIssueNum}개 이슈 선택`}</span> : <NavLink navData={openCloseIssue} />}
        </S.IssueStates>
        <S.IssueInfoTabs>
          {checkedIssueNum ? (
            <Dropdown {...OPEN_CLOSE_DROPDOWN_ARGS} />
          ) : (
            filterTabs.map((info) => <Dropdown {...info} />)
          )}
        </S.IssueInfoTabs>
      </S.IssueHeader>
      {issueListData.map((props) => (
        <IssueItem key={props.id} issueInfo={props} />
      ))}
    </S.StyledIssueTable>
  );
};

export default IssueTable;
