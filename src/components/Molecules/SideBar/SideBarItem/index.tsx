/* eslint-disable array-callback-return */
import React, { Fragment } from 'react';
import * as S from '@/components/Molecules/SideBar/index.styles';
import Label from '@/components/Atoms/Label';
import PrograssBar from '@/components/Atoms/ProgressBar';
import UserImage from '@/components/Atoms/UserImage';
import Dropdown from '@/components/Molecules/Dropdown';

import {
  isAssignTypes,
  isLabelTypes,
  isMilestoneTypes,
  ContentItemTypes,
  SideBarItemType,
} from '@/components/Molecules/SideBar/types';

import { LabelTypes, UserTypes, MilestoneTypes } from '@/api/issue/types';

interface handleOnChangeTypes {
  handleOnChange: (target: HTMLInputElement) => void;
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const SideBarItem = ({ ...props }: SideBarItemType & ContentItemTypes & handleOnChangeTypes) => {
  const { id, dropdownTitle, dropdownListTitle, dropdownList, dropdownType, content, handleOnChange, handleOnClick } =
    props;

  const isChecked = (title: string) => {
    const contentList: (UserTypes | LabelTypes | MilestoneTypes)[] = content;
    const findContent = contentList.find((el) => {
      if (isAssignTypes(el)) return el.nickname === title;
      if (isLabelTypes(el) || isMilestoneTypes(el)) return el.title === title;
    });

    return !!findContent;
  };

  return (
    <S.SideBarItem key={`sidebar-${id}`} className="sidebar_item" onClick={handleOnClick} data-id={id}>
      <Dropdown
        indicatorProps={{
          indicatorStyle: 'SIDEBAR',
          indicatorLabel: dropdownTitle,
        }}
        type="List"
        panelProps={{
          panelId: id,
          panelTitle: dropdownListTitle,
          panelList: dropdownList,
          panelType: dropdownType,
          handleOnClick: handleOnChange,
          isChecked,
          unusedOption: id === 'milestone' ? { dataId: 'none', title: '마일스톤 없음' } : undefined,
        }}
      />

      <S.SideBarContent isEmpty={!content.length} className="content_list">
        {content.map((contentItem) => {
          if (isAssignTypes(contentItem)) {
            return (
              <S.SideBarAssignee key={contentItem.nickname}>
                <UserImage {...contentItem} imgSize="MEDIUM" />
                <span>{contentItem.nickname}</span>
              </S.SideBarAssignee>
            );
          }

          if (isLabelTypes(contentItem)) {
            const { title: labelTitle, backgroundColorCode, textColor } = contentItem;
            return (
              <li key={labelTitle}>
                <Label
                  title={labelTitle}
                  labelStyle="LIGHT"
                  textColor={textColor}
                  backgroundColorCode={backgroundColorCode}
                />
              </li>
            );
          }

          if (isMilestoneTypes(contentItem)) {
            const { title: milestoneTitle, openIssueCount, closedIssueCount } = contentItem;
            return (
              <Fragment key={milestoneTitle}>
                <PrograssBar open={openIssueCount} close={closedIssueCount} title={milestoneTitle} />
              </Fragment>
            );
          }
        })}
      </S.SideBarContent>
    </S.SideBarItem>
  );
};

export default SideBarItem;
