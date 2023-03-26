import { useSetRecoilState } from 'recoil';
import { ModalState } from '@/stores/modal';
import * as S from '@/components/Modal/index.styles';
import Button from '@/components/Atoms/Button';
import { MODAL_BUTTON_INFO } from '@/components/Atoms/Button/options';

interface DeleteModalTypes {
  handleDeleteButtonClick: () => void;
}

const DeleteCheck = ({ handleDeleteButtonClick }: DeleteModalTypes) => {
  const setModalState = useSetRecoilState(ModalState);

  const handleCancleButton = () => {
    setModalState(false);
  };

  const handleDeleteButton = () => {
    setModalState(false);
    handleDeleteButtonClick();
  };

  return (
    <>
      <S.ModalTitle>정말 삭제하시겠습니까?</S.ModalTitle>
      <S.ModalComment>삭제하면 되돌릴 수 없습니다.</S.ModalComment>
      <S.ModalAlertButtons>
        <Button {...MODAL_BUTTON_INFO.NO} handleOnClick={handleCancleButton} />
        <Button {...MODAL_BUTTON_INFO.YES} handleOnClick={handleDeleteButton} />
      </S.ModalAlertButtons>
    </>
  );
};

export default DeleteCheck;
