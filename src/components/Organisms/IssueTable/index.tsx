/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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

import { IssuesTypes } from '@/api/issue/types';
import { FilterStatsState, FilterState } from '@/stores/filter';
import { openCloseIssue } from '@/components/Molecules/NavLink/options';
import useFetchSideBarData from '@/api/useFetchSideBarData';
import useFilter, { noneFilterReg } from '@/hooks/useFilter';

interface IssueTableTypes {
  issuesData: IssuesTypes;
  filterTabs: DropdownTypes<ListPanelTypes>[];
}

const PARENT_CHECKBOX_ID = -1;

const IssueTable = ({ issuesData, filterTabs }: IssueTableTypes) => {
  const { openIssueCount, closedIssueCount, issues } = issuesData;

  const [checkState, setCheckState] = useRecoilState(CheckState);
  const setDefaultCheckIds = useSetRecoilState(DefaultCheckIds);
  const checkedBoxNum = checkState.child.length;

  const { useUpdateIssueState } = useFetchIssue();
  const { mutate: updateIssueState } = useUpdateIssueState(checkState.child);
  const { memberData, memberDataRefetch } = useFetchSideBarData();
  const memberId = useRecoilValue(LoginUserInfoState).id;

  const filterState = useRecoilValue(FilterState);
  const { page, queries } = useRecoilValue(FilterStatsState);

  const { isExistedFilter, setParsingFilterState, setRemovedFilterState } = useFilter();

  const changeIssueState = (target: HTMLInputElement) => {
    const clickedPanelStatus = target.dataset.id;
    const status = clickedPanelStatus === 'closed';
    const newState = { status, ids: checkState.child };
    updateIssueState({ newState, memberId });
    setCheckState({ ...checkState, parent: false, child: [] });
  };

  const handleOnOpenClosedNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedNavDataId = event.currentTarget.dataset.id;
    setParsingFilterState(clickedNavDataId!);
  };

  const handleOnMemberDropdownClick = (filterKey: string) => {
    const isMemberListData = filterKey === 'assignee' || filterKey === 'author';
    if (isMemberListData && !memberData) memberDataRefetch();
  };

  const handleOnFilterTabsClick = (target: HTMLInputElement) => {
    const key = target.dataset.panel!;
    const value: string = target.dataset.id!;
    const filter = value.match(noneFilterReg) ? value : `${key}:${value}`;

    if (isExistedFilter(filter)) {
      setRemovedFilterState(filter);
      return;
    }

    setParsingFilterState(filter);
  };

  const isFilterTabsChecked = (panelId: string) => {
    const content = filterState[panelId];

    return (dataId: string): boolean => {
      if (Array.isArray(content)) {
        return !!content.find((e) => e === dataId);
      }
      return content === dataId;
    };
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
                defaultActive="is:open"
              />
            )}
          </S.IssueStates>
          <S.IssueInfoTabs>
            {checkedBoxNum ? (
              <Dropdown {...OPEN_CLOSE_DROPDOWN_ARGS(changeIssueState)} />
            ) : (
              filterTabs.map((filterTab: DropdownTypes<ListPanelTypes>) => {
                const { panelId: filterKey, panelTitle } = filterTab.panelProps;

                const DROPDOWN_PROPS = {
                  ...filterTab,
                  panelProps: {
                    ...filterTab.panelProps,
                    handleOnClick: handleOnFilterTabsClick,
                    isChecked: isFilterTabsChecked(filterKey),
                  },
                };

                return (
                  <Dropdown
                    key={panelTitle}
                    {...DROPDOWN_PROPS}
                    handleOnDropdownClick={(e) => handleOnMemberDropdownClick(filterKey)}
                  />
                );
              })
            )}
          </S.IssueInfoTabs>
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
