import { atom } from 'recoil';
import ModalPortal from '@/Portal';
import { BackGround, ModalBlock } from '@/components/Modal/index.styled';

export const ModalState = atom<boolean>({
  key: 'ModalState',
  default: false,
});

const Modal = ({ children }: any): JSX.Element => (
  <ModalPortal>
    <BackGround>
      <ModalBlock>{children}</ModalBlock>
    </BackGround>
  </ModalPortal>
);

export default Modal;
