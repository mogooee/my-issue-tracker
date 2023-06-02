import { useRecoilState, useRecoilValue } from 'recoil';
import { CheckState } from '@/stores/checkBox';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import useFetchSideBarData from '@/api/useFetchSideBarData';
import useFetchIssue from '@/api/issue/useFetchIssue';

import { DropdownTypes, ListPanelTypes } from '@/components/Molecules/Dropdown/types';

import {
  ASSIGNEE_DROPDOWN_ARGS,
  AUTHOR_DROPDOWN_ARGS,
  LABEL_DROPDOWN_ARGS,
  MILESTONE_DROPDOWN_ARGS,
  OPEN_CLOSE_DROPDOWN_ARGS,
} from '@/components/Molecules/Dropdown/mock';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import Dropdown from '@/components/Molecules/Dropdown';

import useFilter, { noneFilterReg } from '@/hooks/useFilter';

const TableInfoTabs = () => {
  const memberId = useRecoilValue(LoginUserInfoState).id;
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const checkedBoxNum = checkState.child.length;

  const { memberData, memberDataRefetch, labelData, milestoneData, labelDataRefetch, milestoneDataRefetch } =
    useFetchSideBarData();
  const { useUpdateIssueState } = useFetchIssue();
  const { mutate: updateIssueState } = useUpdateIssueState(checkState.child);

  const changeIssueState = (target: HTMLInputElement) => {
    const clickedPanelStatus = target.dataset.id;
    const status = clickedPanelStatus === 'closed';
    const newState = { status, ids: checkState.child };
    updateIssueState({ newState, memberId });
    setCheckState({ ...checkState, parent: false, child: [] });
  };

  const totalMilestones =
    milestoneData?.openedMilestones && milestoneData?.closedMilestones
      ? [...milestoneData.openedMilestones, ...milestoneData.closedMilestones].sort((a, b) => a.id - b.id)
      : [];

  const filterTabs = [
    ASSIGNEE_DROPDOWN_ARGS(memberData || []),
    LABEL_DROPDOWN_ARGS(labelData || []),
    MILESTONE_DROPDOWN_ARGS(totalMilestones),
    AUTHOR_DROPDOWN_ARGS(memberData || []),
  ];

  const { isExistedFilter, parseFilter, searchFilter, changeNotEngFilter } = useFilter();

  const handleOnFilterTabsClick = (target: HTMLInputElement) => {
    const key = target.dataset.panel!;
    const dataId = target.dataset.id!;
    const filter = dataId.match(noneFilterReg) ? dataId : `${key}:${changeNotEngFilter(dataId)}`;

    const parsingFilter = parseFilter(filter);
    searchFilter(parsingFilter);
  };

  const isFilterTabsChecked =
    (panelId: string) =>
    (dataId: string): boolean => {
      const value = changeNotEngFilter(dataId);
      const filter = `${panelId}:${value}`;

      return isExistedFilter(filter);
    };

  const handleOnMemberDropdownClick = (filterKey: string) => {
    const isMemberListData = filterKey === 'assignee' || filterKey === 'author';
    if (isMemberListData && !memberData) memberDataRefetch();
    if (filterKey === 'label' && !labelData) labelDataRefetch();
    if (filterKey === 'milestone' && !milestoneData) milestoneDataRefetch();
  };

  return (
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
  );
};

export default TableInfoTabs;
