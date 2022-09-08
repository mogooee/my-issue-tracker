/* eslint-disable array-callback-return */
import { useState } from 'react';
import * as S from '@/components/Molecules/SideBar/index.styles';
import SideBarItem from '@/components/Molecules/SideBar/SideBarItem';
import {
  SideBarTypes,
  isAssignTypes,
  isLabelTypes,
  isMilestoneTypes,
  ContentListTypes,
} from '@/components/Molecules/SideBar/types';

import { LabelTypes, UserTypes, MilestoneTypes } from '@/api/issue/types';

const SideBar = ({ ...props }: SideBarTypes) => {
  const { content, sideBarList } = props;

  // recoil로 바꿔주기
  const [contentList, setContentList] = useState(content);

  const handleOnChange = (target: HTMLInputElement) => {
    const { id, panel } = target.dataset;
    const { checked } = target;

    // 마일스톤 없음 클릭시
    if (id === 'none' && panel === 'milestone' && checked) {
      return setContentList({ ...contentList, [panel]: [] });
    }

    const sidebarItem = sideBarList.find((el) => el.id === panel);
    const sidebarDropdownList: (UserTypes | LabelTypes | MilestoneTypes)[] = sidebarItem!.dropdownList;

    const findContent = sidebarDropdownList.find((el) => {
      if (isAssignTypes(el)) return el.nickname === id;
      if (isLabelTypes(el) || isMilestoneTypes(el)) return el.title === target.dataset.id;
    });

    const contentKey = panel as keyof ContentListTypes;
    const contentItem: (UserTypes | LabelTypes | MilestoneTypes)[] = contentList[contentKey];

    const filterContent = contentItem.filter((el) => {
      if (isAssignTypes(el)) return el.nickname !== id;
      if (isLabelTypes(el) || isMilestoneTypes(el)) return el.title !== target.dataset.id;
    });

    if (checked) {
      if (id !== 'none' && contentKey === 'milestone' && isMilestoneTypes(findContent!)) {
        // 마일스톤 클릭시 하나의 요소만 들어갈 수 있도록 한다.
        return setContentList({ ...contentList, [contentKey]: [findContent] });
      }
      return setContentList({ ...contentList, [contentKey]: [...contentList[contentKey], findContent] });
    }
    return setContentList({ ...contentList, [contentKey]: [...filterContent] });
  };

  return (
    <S.SideBar>
      {sideBarList.map((item) => (
        <SideBarItem {...item} key={item.id} content={contentList[item.id]} handleOnChange={handleOnChange} />
      ))}
    </S.SideBar>
  );
};

export default SideBar;
