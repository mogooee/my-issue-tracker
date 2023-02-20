import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from '@/components/Organisms/SideBar/index.styles';
import SideBarItem from '@/components/Organisms/SideBar/SideBarItem';

import { ContentListTypes } from '@/components/Organisms/SideBar/types';

const ErrorSideBar = ({
  contentList,
  resetState,
  errorCode,
}: {
  contentList: ContentListTypes;
  resetState: () => void;
  errorCode: number;
}) => {
  const queryClient = useQueryClient();
  const emptyFunction = () => {};
  const resetError = () => {
    if (!errorCode) {
      alert('네트워크 연결이 원활하지 않습니다. 네트워크 상태를 확인해주세요.');
    }

    if (errorCode === 1000 || errorCode === 1001) {
      resetState();
      queryClient.resetQueries(['members']);
    }
  };

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
        resetError={resetError}
        isError
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
        resetError={resetError}
        isError
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
        resetError={resetError}
        isError
      />
    </S.SideBar>
  );
};

export default ErrorSideBar;
