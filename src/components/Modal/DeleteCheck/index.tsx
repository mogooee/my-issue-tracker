import { useSetRecoilState } from 'recoil';
import { ModalState } from '@/components/Modal';

import * as S from '@/components/Modal/index.styled';
import Button from '@/components/Atoms/Button';
import { MODAL_BUTTON_INFO } from '@/components/Atoms/Button/options';

import useFetchLabel from '@/api/label/useFetchLabel';

const DeleteCheck = ({ id }: { id: number }) => {
  const { deleteLabel } = useFetchLabel();
  const setModalState = useSetRecoilState(ModalState);

  const handleCancleButton = () => {
    setModalState(false);
  };

  const handleDeleteButton = () => {
    setModalState(false);
    deleteLabel(id);
  };

  return (
    <>
      <S.ModalTitle>정말 삭제하시겠습니까?</S.ModalTitle>
      <S.ModalComment>삭제한 레이블은 되돌릴 수 없습니다.</S.ModalComment>
      <S.ModalAlertButtons>
        <Button {...MODAL_BUTTON_INFO.NO} handleOnClick={handleCancleButton} />
        <Button {...MODAL_BUTTON_INFO.YES} handleOnClick={handleDeleteButton} />
      </S.ModalAlertButtons>
    </>
  );
};

export default DeleteCheck;
