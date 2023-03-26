import ModalPortal from '@/Portal';
import { BackGround, ModalBlock } from '@/components/Modal/index.styles';

const Modal = ({ children }: any): JSX.Element => (
  <ModalPortal>
    <BackGround>
      <ModalBlock>{children}</ModalBlock>
    </BackGround>
  </ModalPortal>
);

export default Modal;
