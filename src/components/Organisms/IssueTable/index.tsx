/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useFetchIssue from '@/api/issue/useFetchIssue';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { CheckState, DefaultCheckIds } from '@/stores/checkBox';

import CheckBox from '@/components/Atoms/CheckBox';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem from '@/components/Organisms/IssueTable/IssueItem';
import Dropdown from '@/components/Molecules/Dropdown';

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

const definedItem = (
  state: IssueStateType,
  openIssuesContent: ContentTypes[],
  closedIssuesContent: ContentTypes[],
): ContentTypes[] => {
  if (state === 'open') {
    return openIssuesContent;
  }
  if (state === 'closed') {
    return closedIssuesContent;
  }

  return [...openIssuesContent, ...closedIssuesContent];
};

const IssueTable = ({ issues, filterTabs, issueState }: IssueTableTypes) => {
  const { openIssueCount, openIssues, closedIssueCount, closedIssues } = issues;

  const [checkState, setCheckState] = useRecoilState(CheckState);
  const setDefaultCheckIds = useSetRecoilState(DefaultCheckIds);
  const checkedBoxNum = checkState.child.length;

  const { useUpdateIssueState } = useFetchIssue();
  const { mutate: updateIssueState } = useUpdateIssueState(checkState.child);
  const memberId = useRecoilValue(LoginUserInfoState).id;

  const items = definedItem(issueState, openIssues.content, closedIssues.content);

  const changeIssueState = (target: HTMLInputElement) => {
    const clickedPanelStatus = target.dataset.id;
    const status = clickedPanelStatus === 'close';
    const newState = { status, ids: checkState.child };
    updateIssueState({ newState, memberId });
    setCheckState({ ...checkState, parent: false, child: [] });
  };

  const IssueStateDropdownProps = {
    ...OPEN_CLOSE_DROPDOWN_ARGS,
    panelProps: { ...OPEN_CLOSE_DROPDOWN_ARGS.panelProps, handleOnClick: changeIssueState },
  };

  useEffect(() => {
    const openIds: number[] = issues.openIssues.content.map((openIssue) => openIssue.id);
    const closedIds: number[] = issues.closedIssues.content.map((closedIssue) => closedIssue.id);
    setDefaultCheckIds({ openIds, closedIds });
  }, [issues.openIssueCount]);

  return (
    <Table
      header={
        <S.IssueTableHeader>
          <CheckBox id={-1} type="parent" checked={checkState.parent} />
          <S.IssueStates>
            {checkedBoxNum > 0 ? (
              <span>{`${checkedBoxNum}개 이슈 선택`}</span>
            ) : (
              <NavLink
                navData={openCloseIssue(openIssueCount, closedIssueCount)}
                defaultActive="is:open"
              />
            )}
          </S.IssueStates>
          <S.IssueInfoTabs>
            {checkedBoxNum > 0 ? (
              <Dropdown {...IssueStateDropdownProps} />
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
