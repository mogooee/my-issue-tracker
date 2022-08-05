import ReactDOM from 'react-dom';

export default function ModalPortal({ children }: any): JSX.Element {
  const modal = document.getElementById('modal-root') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}
