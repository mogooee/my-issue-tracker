import { useResetRecoilState, useSetRecoilState } from 'recoil';
import useFetchMilestone from '@/api/milestone/useFetchMilestone';
import { ClickMilestoneState } from '@/stores/milestone';
import { ModalState } from '@/stores/modal';

import * as S from '@/components/Modal/index.styles';
import Button from '@/components/Atoms/Button';
import { MODAL_BUTTON_INFO } from '@/components/Atoms/Button/options';

const DeleteMilestoneModal = ({ id }: { id: number }) => {
  const { deleteMilestoneMutate } = useFetchMilestone();
  const setIsOpenModalState = useSetRecoilState(ModalState);
  const resetClickMilestoneState = useResetRecoilState(ClickMilestoneState);

  return (
    <>
      <S.ModalTitle>해당 마일스톤을 삭제하겠습니까?</S.ModalTitle>
      <S.ModalComment>삭제한 마일스톤은 되돌릴 수 없습니다.</S.ModalComment>
      <S.ModalAlertButtons>
        <Button
          {...MODAL_BUTTON_INFO.NO}
          handleOnClick={() => {
            setIsOpenModalState((state) => !state);
            resetClickMilestoneState();
          }}
        />
        <Button
          {...MODAL_BUTTON_INFO.YES}
          handleOnClick={() => {
            deleteMilestoneMutate(id);
            setIsOpenModalState((state) => !state);
          }}
        />
      </S.ModalAlertButtons>
    </>
  );
};

export default DeleteMilestoneModal;
