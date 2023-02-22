import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from '@/components/Organisms/IssueTable/index.styles';
import Dropdown from '@/components/Molecules/Dropdown';
import {
  ASSIGNEE_DROPDOWN_ARGS,
  AUTHOR_DROPDOWN_ARGS,
  LABEL_DROPDOWN_ARGS,
  MILESTONE_DROPDOWN_ARGS,
} from '@/components/Molecules/Dropdown/mock';
import { DropdownTypes, ListPanelTypes } from '@/components/Molecules/Dropdown/types';

const ErrorInfoTabs = ({ resetState, errorCode }: { resetState: () => void; errorCode: number }) => {
  const queryClient = useQueryClient();
  const filterTabs = [
    ASSIGNEE_DROPDOWN_ARGS([]),
    LABEL_DROPDOWN_ARGS([]),
    MILESTONE_DROPDOWN_ARGS([]),
    AUTHOR_DROPDOWN_ARGS([]),
  ];

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
    <S.IssueInfoTabs>
      {filterTabs.map((filterTab: DropdownTypes<ListPanelTypes>) => {
        const { panelTitle } = filterTab.panelProps;

        const DROPDOWN_PROPS = {
          ...filterTab,
          panelProps: {
            handleOnClick: resetError,
          },
          isError: true,
        };

        return <Dropdown key={panelTitle} {...DROPDOWN_PROPS} type="Error" />;
      })}
    </S.IssueInfoTabs>
  );
};

export default ErrorInfoTabs;
