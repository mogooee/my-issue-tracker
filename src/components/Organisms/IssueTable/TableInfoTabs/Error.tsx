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

  const emptyfunc = (title: string) => false;

  useEffect(() => {
    if (!errorCode) {
      alert('잘못된 요청입니다.');
    }

    if (errorCode === 1000 || errorCode === 1001) {
      resetState();
      queryClient.resetQueries(['members']);
    }
  }, []);

  return (
    <S.IssueInfoTabs>
      {filterTabs.map((filterTab: DropdownTypes<ListPanelTypes>) => {
        const { panelId: filterKey, panelTitle } = filterTab.panelProps;

        const DROPDOWN_PROPS = {
          ...filterTab,
          panelProps: {
            ...filterTab.panelProps,
            handleOnClick: (target: HTMLInputElement) => {},
            isChecked: () => emptyfunc(filterKey),
          },
        };

        return (
          <Dropdown
            key={panelTitle}
            {...DROPDOWN_PROPS}
            handleOnDropdownClick={(event: React.MouseEvent<HTMLDetailsElement, MouseEvent>) => {}}
          />
        );
      })}
    </S.IssueInfoTabs>
  );
};

export default ErrorInfoTabs;
