import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ModalState } from '@/components/Modal';

import * as S from '@/components/Organisms/MilestoneTable/MilestoneItem/index.styles';
import Button from '@/components/Atoms/Button';
import Icon from '@/components/Atoms/Icon';
import PrograssBar from '@/components/Atoms/ProgressBar';
import MilestoneEditForm from '@/components/Molecules/MilestoneEditForm';
import { TABLE_ITEM_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { COLORS } from '@/styles/theme';
import useFetchMilestone from '@/api/milestone/useFetchMilestone';
import { ClickMilestoneState } from '@/stores/milestone';
import { MilestoneTypes } from '@/api/issue/types';

const MilestoneItem = (props: MilestoneTypes) => {
  const { patchMilestoneStateMutate } = useFetchMilestone();

  const { id, title, description, dueDate, openIssueCount, closedIssueCount, closed } = props;
  const [isOpenModifyEditer, setIsOpenModifyEditer] = useState(false);
  const setIsOpenModalState = useSetRecoilState(ModalState);
  const setClickMilestoneState = useSetRecoilState(ClickMilestoneState);

  return (
    <>
      <S.MilestoneItem>
        <S.MilestoneItemInfo>
          <Link to={`/milestone/${id}`} className="MilestoneItem_title">
            <Icon icon="Milestone" fill={COLORS.PRIMARY.BLUE} stroke={COLORS.PRIMARY.BLUE} />
            <span>{title}</span>
          </Link>
          <div className="MilestoneItem_dueDate">
            <Icon icon="Calendar" stroke={COLORS.LABEL} />
            <span>{dueDate || '완료일 없음'}</span>
          </div>
          <p className="MilestoneItem_description">{description || ' '}</p>
        </S.MilestoneItemInfo>
        <div>
          <S.MilestoneItemButtons isOpenModifyEditer={isOpenModifyEditer}>
            <Button
              {...(closed ? TABLE_ITEM_BUTTON_INFO.MILESTONE_OPEN : TABLE_ITEM_BUTTON_INFO.CLOSE)}
              handleOnClick={() => patchMilestoneStateMutate(id)}
            />
            <Button {...TABLE_ITEM_BUTTON_INFO.MODIFY} handleOnClick={() => setIsOpenModifyEditer((state) => !state)} />
            <Button
              {...TABLE_ITEM_BUTTON_INFO.DELETE}
              handleOnClick={() => {
                setClickMilestoneState(props);
                setIsOpenModalState((state) => !state);
              }}
            />
          </S.MilestoneItemButtons>
          <PrograssBar open={openIssueCount} close={closedIssueCount} showState />
        </div>
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
