import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { ModalState } from '@/stores/modal';

import * as S from '@/components/Modal/index.styles';
import Button from '@/components/Atoms/Button';
import { MODAL_BUTTON_INFO } from '@/components/Atoms/Button/options';
import { NewIssueFormState } from '@/stores/newIssue';

const CancelNewIssueModal = () => {
  const setModalState = useSetRecoilState(ModalState);
  const resetNewIssueFormState = useResetRecoilState(NewIssueFormState);
  const navigate = useNavigate();

  const closeModal = () => setModalState(false);

  const moveToIssuePage = () => {
    setModalState(false);
    resetNewIssueFormState();
    navigate('/issues');
  };

  return (
    <>
      <S.ModalTitle>이슈 페이지로 돌아가겠습니까?</S.ModalTitle>
      <S.ModalComment>작성하던 내용은 저장되지 않습니다.</S.ModalComment>
      <S.ModalAlertButtons>
        <Button {...MODAL_BUTTON_INFO.NO} handleOnClick={closeModal} />
        <Button {...MODAL_BUTTON_INFO.YES} handleOnClick={moveToIssuePage} />
      </S.ModalAlertButtons>
    </>
  );
};

export default CancelNewIssueModal;
