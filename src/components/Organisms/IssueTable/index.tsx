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

import { ContentTypes, IssuesTypes } from '@/api/issue/types';
import { FilterStatsState, FilterState, IssueStateType, NoFilterKeysType } from '@/stores/filter';
import { openCloseIssue } from '@/components/Molecules/NavLink/options';

interface IssueTableTypes {
  issues: IssuesTypes;
  filterTabs: DropdownTypes<ListPanelTypes>[];
  issueState: IssueStateType;
}

const noneFilterReg = /^no:/g;
const labelFilterReg = /^label/g;
const PARENT_CHECKBOX_ID = -1;

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

  const [filterState, setFilterState] = useRecoilState(FilterState);
  const { page, quries } = useRecoilValue(FilterStatsState);

  const changeIssueState = (target: HTMLInputElement) => {
    const clickedPanelStatus = target.dataset.id;
    const status = clickedPanelStatus === 'closed';
    const newState = { status, ids: checkState.child };
    updateIssueState({ newState, memberId });
    setCheckState({ ...checkState, parent: false, child: [] });
  };

  const IssueStateDropdownProps = {
    ...OPEN_CLOSE_DROPDOWN_ARGS,
    panelProps: { ...OPEN_CLOSE_DROPDOWN_ARGS.panelProps, handleOnClick: changeIssueState },
  };

  const handleOnOpenClosedNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedNavDataId = event.currentTarget.dataset.id;
    const [stateKey, stateValue] = clickedNavDataId!.split(':');
    setFilterState((prev) => ({ ...prev, [stateKey]: stateValue }));
  };

  const handleOnFilterTabsClick = (target: HTMLInputElement) => {
    const key = target.dataset.panel!;
    const value: string | string[] = target.dataset.id!;

    const isExistedFilter = (): boolean => {
      if (value.match(noneFilterReg)) return !!filterState.no.find((e) => e === key);
      if (key.match(labelFilterReg)) return !!filterState.label.find((e) => e === value);
      return filterState[key] === value;
    };

    // 필터 해제
    if (isExistedFilter()) {
      if (value.match(noneFilterReg)) return;

      setFilterState((prevState) => {
        const checkOffValue = key.match(labelFilterReg) ? prevState.label.filter((e) => e !== value) : '';
        return { ...prevState, [key]: checkOffValue };
      });
      return;
    }

    // 필터 설정
    setFilterState((prevState) => {
      if (value.match(noneFilterReg)) {
        const initPrevState = key.match(labelFilterReg) ? [] : '';
        const newNoFilterKey = key as NoFilterKeysType;
        return {
          ...prevState,
          [key]: initPrevState,
          no: [...prevState.no, newNoFilterKey],
        };
      }

      const checkOnValue = key.match(labelFilterReg) ? [...prevState.label, value] : value;
      return { ...prevState, [key]: checkOnValue, no: [...prevState.no.filter((e) => e !== key)] };
    });
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
    const openIds: number[] = issues.openIssues.content.map((openIssue) => openIssue.id);
    const closedIds: number[] = issues.closedIssues.content.map((closedIssue) => closedIssue.id);
    setDefaultCheckIds({ openIds, closedIds });
  }, [issues.openIssueCount]);

  return (
    <Table
      header={
        <S.IssueTableHeader>
          <CheckBox id={PARENT_CHECKBOX_ID} type="parent" checked={checkState.parent} />
          <S.IssueStates>
            {checkedBoxNum > 0 ? (
              <span>{`${checkedBoxNum}개 이슈 선택`}</span>
            ) : (
              <NavLink
                navData={openCloseIssue(openIssueCount, closedIssueCount, page, quries)}
                handleOnClick={handleOnOpenClosedNavClick}
                defaultActive="is:open"
              />
            )}
          </S.IssueStates>
          <S.IssueInfoTabs>
            {checkedBoxNum > 0 ? (
              <Dropdown {...IssueStateDropdownProps} />
            ) : (
              filterTabs.map((info) => {
                const DROPDOWN_PROPS = {
                  ...info,
                  panelProps: {
                    ...info.panelProps,
                    handleOnClick: handleOnFilterTabsClick,
                    isChecked: isFilterTabsChecked(info.panelProps.panelId),
                  },
                };

                return <Dropdown key={info.panelProps.panelTitle} {...DROPDOWN_PROPS} />;
              })
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
