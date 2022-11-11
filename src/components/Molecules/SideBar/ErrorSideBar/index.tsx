import { useState } from 'react';

import * as S from '@/components/Molecules/SideBar/index.styles';
import SideBarItem from '@/components/Molecules/SideBar/SideBarItem';

import { ContentListTypes } from '@/components/Molecules/SideBar/types';

const ErrorSideBar = ({ contentList }: { contentList: ContentListTypes }) => {
  const emptyFunction = () => {};

  return (
    <S.SideBar>
      <SideBarItem
        id="assignee"
        dropdownTitle="담당자"
        dropdownListTitle="담당자 필터"
        dropdownList={[]}
        dropdownType="checkbox"
        content={contentList.assignee}
        handleOnChange={emptyFunction}
        handleOnClick={emptyFunction}
      />
      <SideBarItem
        id="label"
        dropdownTitle="레이블"
        dropdownListTitle="레이블 필터"
        dropdownList={[]}
        dropdownType="checkbox"
        content={contentList.label}
        handleOnChange={emptyFunction}
        handleOnClick={emptyFunction}
      />
      <SideBarItem
        id="milestone"
        dropdownTitle="마일스톤"
        dropdownListTitle="마일스톤 필터"
        dropdownList={[]}
        dropdownType="radio"
        content={contentList.milestone}
        handleOnChange={emptyFunction}
        handleOnClick={emptyFunction}
      />
    </S.SideBar>
  );
};

export default ErrorSideBar;
