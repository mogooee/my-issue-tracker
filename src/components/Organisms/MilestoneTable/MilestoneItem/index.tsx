import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import * as S from '@/components/Organisms/MilestoneTable/MilestoneItem/index.styles';
import { COLORS } from '@/styles/theme';

import { ModalState } from '@/stores/modal';
import Button from '@/components/Atoms/Button';
import Icon from '@/components/Atoms/Icon';
import PrograssBar from '@/components/Atoms/ProgressBar';
import MilestoneEditForm from '@/components/Molecules/MilestoneEditForm';
import { MILESTONE_BTNS_ARGS } from '@/components/Molecules/Dropdown/mock';
import Dropdown from '@/components/Molecules/Dropdown';

import { TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { ClickMilestoneState } from '@/stores/milestone';
import { MilestoneTypes } from '@/api/issue/types';
import useFetchMilestone from '@/api/milestone/useFetchMilestone';
import useFilter from '@/hooks/useFilter';

const MilestoneItem = (props: MilestoneTypes) => {
  const { patchMilestoneStateMutate } = useFetchMilestone();
  const { changeNotEngFilter } = useFilter();

  const { id, title, description, dueDate, openIssueCount, closedIssueCount, closed } = props;
  const [isOpenModifyEditer, setIsOpenModifyEditer] = useState(false);
  const setIsOpenModalState = useSetRecoilState(ModalState);
  const setClickMilestoneState = useSetRecoilState(ClickMilestoneState);

  const handleStateButtonClick = () => patchMilestoneStateMutate(id);
  const handleModifyButtonClick = () => setIsOpenModifyEditer((state) => !state);
  const handleDeleteButtonClick = () => {
    setClickMilestoneState(props);
    setIsOpenModalState((state) => !state);
  };

  const clickHandler = {
    stateButton: handleStateButtonClick,
    editButton: handleModifyButtonClick,
    deleteButton: handleDeleteButtonClick,
  };

  return (
    <>
      <S.MilestoneItem>
        <S.MilestoneItemInfo>
          <S.MilestoneTitle>
            <Link to={`/issues?page=0&q=milestone%3A${changeNotEngFilter(title)}`} className="MilestoneItem_title">
              <Icon icon="Milestone" fill={COLORS.PRIMARY.BLUE} stroke={COLORS.PRIMARY.BLUE} />
              <span>{title}</span>
            </Link>
            <Dropdown {...MILESTONE_BTNS_ARGS(clickHandler)} />
          </S.MilestoneTitle>
          <div className="MilestoneItem_dueDate">
            <Icon icon="Calendar" stroke={COLORS.LABEL} />
            <span>{dueDate || '완료일 없음'}</span>
          </div>
          {description && <p className="MilestoneItem_description">{description}</p>}
        </S.MilestoneItemInfo>
        <S.MilestoneItemStates>
          <S.MilestoneItemButtons isOpenModifyEditer={isOpenModifyEditer}>
            <Button
              {...(closed ? TABLE_ITEM_BUTTON_INFO.MILESTONE_OPEN : TABLE_ITEM_BUTTON_INFO.CLOSE)}
              handleOnClick={handleStateButtonClick}
            />
            <Button {...TABLE_ITEM_BUTTON_INFO.MODIFY} handleOnClick={handleModifyButtonClick} />
            <Button {...TABLE_ITEM_BUTTON_INFO.DELETE} handleOnClick={handleDeleteButtonClick} />
          </S.MilestoneItemButtons>
          <PrograssBar open={openIssueCount} close={closedIssueCount} showState />
        </S.MilestoneItemStates>
      </S.MilestoneItem>
      {isOpenModifyEditer && (
        <MilestoneEditForm
          editMode="MODIFY"
          id={id}
          milestoneInfo={{ title, description, dueDate }}
          setOpenState={setIsOpenModifyEditer}
        />
      )}
    </>
  );
};

export default MilestoneItem;
