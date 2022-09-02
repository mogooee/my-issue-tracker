import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ModalState } from '@/components/Modal';
import Button from '@/components/Atoms/Button';
import useFetchMilestone from '@/hooks/useFetchMilestone';
import styled from 'styled-components';
import { ClickMilestoneState } from '@/stores/milestone';

const StyledDeleteModal = styled.div`
  h1 {
    ${({ theme }) => theme.FONTSTYLES.TEXT_LARGE};
    margin-bottom: 12px;
  }

  p {
    ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    margin-bottom: 20px;
  }

  p + button {
    margin-bottom: 4px;
    background: ${({ theme }) => theme.COLORS.PLACEHOLDER};

    &:hover:not([disabled]) {
      background: ${({ theme }) => theme.COLORS.TITLE_ACTIVE};
    }
  }

  button + button {
    background: ${({ theme }) => theme.COLORS.ERROR.RED};

    &:hover:not([disabled]) {
      background: ${({ theme }) => theme.COLORS.ERROR.DARK_RED};
    }
  }
`;

const DeleteMilestoneModal = ({ id }: { id: number }) => {
  const { deleteMilestoneMutate } = useFetchMilestone();
  const setIsOpenModalState = useSetRecoilState(ModalState);
  const resetClickMilestoneState = useResetRecoilState(ClickMilestoneState);

  return (
    <StyledDeleteModal>
      <h1>해당 마일스톤을 삭제하겠습니까?</h1>
      <p>삭제한 마일스톤은 되돌릴 수 없습니다.</p>
      <Button
        buttonStyle="STANDARD"
        label="아니오"
        size="LARGE"
        handleOnClick={() => {
          setIsOpenModalState((state) => !state);
          resetClickMilestoneState();
        }}
      />
      <Button
        buttonStyle="STANDARD"
        label="예"
        size="LARGE"
        handleOnClick={() => {
          deleteMilestoneMutate(id);
          setIsOpenModalState((state) => !state);
        }}
      />
    </StyledDeleteModal>
  );
};

export default DeleteMilestoneModal;
