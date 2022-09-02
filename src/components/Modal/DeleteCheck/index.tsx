import { useSetRecoilState } from 'recoil';

import Button from '@/components/Atoms/Button';
import { ModalState } from '@/components/Modal';
import styled from 'styled-components';
import useLabelFetch from '@/hooks/useLabelFetch';

const Title = styled.h1`
  ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
`;

const ButtonTab = styled.div`
  display: flex;
  button + button {
    margin-left: 10px;
  }
`;

const DeleteCheck = ({ id }: { id: number }) => {
  const { deleteLabel } = useLabelFetch();
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
      <Title>정말 삭제하시겠습니까?</Title>
      <ButtonTab>
        <Button buttonStyle="STANDARD" label="취소" size="SMALL" handleOnClick={handleCancleButton} />
        <Button buttonStyle="STANDARD" label="확인" size="SMALL" handleOnClick={handleDeleteButton} />
      </ButtonTab>
    </>
  );
};

export default DeleteCheck;
