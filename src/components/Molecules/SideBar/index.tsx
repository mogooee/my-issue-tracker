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

    const key = id as keyof ContentListTypes | 'none';

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
        dropdownList={milestoneData === undefined ? [] : milestoneData!.openedMilestones} // 어쩔수없었습니다...
        dropdownType="radio"
        content={content.milestone}
        handleOnChange={handleOnChangeFunc}
        handleOnClick={handleOnClick}
      />
    </S.SideBar>
  );
};

export default SideBar;

// 이슈 디테일에서 해당 코드를 기본으로 handleOnChange 함수를 구현한 후 해당 주석 삭제하기
// const handleOnChange = (target: HTMLInputElement) => {
//   const { id, panel } = target.dataset;
//   const { checked } = target;

//   // 드롭다운 리스트에서 체크한 아이템의 정보를 찾는다.
//   const findDropdownItem = getFindDropdownItem({ id: id!, panel: panel!, sideBarList });

//   const contentKey = panel as keyof ContentListTypes;

//   // 마일스톤의 드롭다운 아이템 체크시
//   if (contentKey === 'milestone' && checked) {
//     if (id !== 'none' && isMilestoneTypes(findDropdownItem!)) {
//       // 하나의 요소만 들어갈 수 있도록 한다.
//       return setContentList({ ...contentList, [contentKey]: [findDropdownItem] });
//     }
//     // 마일스톤 없음을 체크하면 아무 값도 들어가지 않는다.
//     return setContentList({ ...contentList, [contentKey]: [] });
//   }

//   // 담당자, 레이블 드롭다운 아이템 체크시 findDropdownItem한 요소를 content 리스트에 추가한다.
//   if (contentKey !== 'milestone' && checked) {
//     return setContentList({ ...contentList, [contentKey]: [...contentList[contentKey], findDropdownItem] });
//   }

//   // 드롭다운 리스트에서 체크 해제하면, content 리스트에서 해당하는 요소를 제외한다.
//   const filterContentList = filterUncheckedItem({ id: id!, contentKey, contentList });
//   return setContentList({ ...contentList, [contentKey]: [...filterContentList] });
// };
