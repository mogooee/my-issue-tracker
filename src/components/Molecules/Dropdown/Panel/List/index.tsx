import React from 'react';

import PanelPreviewLabel from '@/components/Molecules/Dropdown/Panel/Label';

import { ListPanelTypes, IssueTypes } from '@/components/Molecules/Dropdown/types';
import { UserTypes, MilestoneTypes, LabelTypes } from '@/api/issue/types';
import * as S from '@/components/Molecules/Dropdown/Panel/List/index.styles';
import UserImage from '@/components/Atoms/UserImage';

const ListPanel = ({ ...props }: ListPanelTypes) => {
  const { panelId, panelTitle, panelType, panelList, unusedOption, handleOnClick, isChecked } = props;

  const handelOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    handleOnClick!(target);
  };

  return (
    <S.Panel>
      <h3>{panelTitle}</h3>
      <ul>
        {unusedOption && (
          <S.PanelItem>
            <input
              id={unusedOption.dataId}
              type={panelType}
              name={panelTitle}
              data-id={unusedOption.dataId}
              data-panel={panelId}
              onChange={handelOnChange}
            />
            <label htmlFor={unusedOption.dataId}>
              <span>{unusedOption.title}</span>
            </label>
          </S.PanelItem>
        )}
        {panelList &&
          panelList.map(({ ...listProps }) => {
            const { id: issueId, title: issueTitle, dataId } = listProps as IssueTypes;
            const { id: labelId, title: labelTitle, backgroundColorCode } = listProps as LabelTypes;
            const { id: milestoneId, title: milestoneTitle } = listProps as MilestoneTypes;
            const { id: userImgId, nickname, profileImage, email } = listProps as UserTypes;

            const ITEM_KEY = `${panelTitle}-${issueId || labelId || milestoneId || userImgId}`;
            const INPUT_NAME = issueTitle || labelTitle || milestoneTitle || nickname;
            const DATASET_ID = dataId || labelTitle || milestoneTitle || nickname;

            return (
              <S.PanelItem key={ITEM_KEY}>
                <input
                  id={ITEM_KEY}
                  type={panelType}
                  name={panelTitle}
                  data-id={DATASET_ID}
                  data-panel={panelId}
                  checked={isChecked?.(INPUT_NAME) || false}
                  onChange={handelOnChange}
                />
                <label htmlFor={ITEM_KEY}>
                  {backgroundColorCode && <PanelPreviewLabel backgroundColor={backgroundColorCode} />}
                  {profileImage && (
                    <UserImage
                      id={userImgId}
                      email={email}
                      profileImage={profileImage}
                      nickname={nickname}
                      imgSize="SMALL"
                    />
                  )}
                  <span>{INPUT_NAME}</span>
                </label>
              </S.PanelItem>
            );
          })}
      </ul>
    </S.Panel>
  );
};

export default ListPanel;
