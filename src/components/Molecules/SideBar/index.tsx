import React from 'react';

import * as S from '@/components/Molecules/SideBar/index.styles';
import SideBarItem from '@/components/Molecules/SideBar/SideBarItem';
import { SideBarTypes, ContentListTypes } from '@/components/Molecules/SideBar/types';

import useFetchSideBarData from '@/api/useFetchSideBarData';

const SideBar = ({ ...props }: SideBarTypes) => {
  const { content, handleOnChange } = props;
  const { memberData, memberDataRefetch, labelData, labelDataRefetch, milestoneData, milestoneDataRefetch } =
    useFetchSideBarData();

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget.dataset;

    // 중복 refetch 방지
    if (id === 'assignee' && !memberData) memberDataRefetch();
    if (id === 'label' && !labelData) labelDataRefetch();
    if (id === 'milestone' && !milestoneData) milestoneDataRefetch();
  };

  const handleOnChangeFunc = (target: HTMLInputElement) => {
    const { id, panel } = target.dataset;
    const { checked } = target;

    const key = id as keyof ContentListTypes | 'no:milestone';

    const findDropdownList = () => {
      switch (panel) {
        case 'assignee':
          return memberData!;
        case 'label':
          return labelData!;
        case 'milestone':
          return milestoneData!.openedMilestones;
        default:
          return [];
      }
    };

    handleOnChange({ id: key!, panel: panel!, checked, dropdownList: findDropdownList() });
  };

  return (
    <S.SideBar>
      <SideBarItem
        id="assignee"
        dropdownTitle="담당자"
        dropdownListTitle="담당자 필터"
        dropdownList={memberData!}
        dropdownType="checkbox"
        content={content.assignee}
        handleOnChange={handleOnChangeFunc}
        handleOnClick={handleOnClick}
      />
      <SideBarItem
        id="label"
        dropdownTitle="레이블"
        dropdownListTitle="레이블 필터"
        dropdownList={labelData!}
        dropdownType="checkbox"
        content={content.label}
        handleOnChange={handleOnChangeFunc}
        handleOnClick={handleOnClick}
      />
      <SideBarItem
        id="milestone"
        dropdownTitle="마일스톤"
        dropdownListTitle="마일스톤 필터"
        dropdownList={milestoneData?.openedMilestones!}
        dropdownType="radio"
        content={content.milestone}
        handleOnChange={handleOnChangeFunc}
        handleOnClick={handleOnClick}
      />
    </S.SideBar>
  );
};

export default SideBar;
