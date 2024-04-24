import React from 'react';
import InternalServerError from './InternalServerError';
import LoginExtensionComponent from './Refresh';
import Modal from '../Modal';
import ExpiredLogin from './ExpiredLogin';
import { FallbackRenderPropsType } from '.';

const UnknownError = () => <div>🚧 Something Error 🚧</div>;

const GlobalErrorUI = ({
  resetErrorBoundary,
  status,
  errorCode,
}: FallbackRenderPropsType): React.ReactElement<React.FunctionComponent> => {
  if (status === 500) {
    return <InternalServerError resetError={resetErrorBoundary} />;
  }

  switch (errorCode) {
    case 1000:
    case 1001:
      return <LoginExtensionComponent resetError={resetErrorBoundary} />;
    case 1002:
    case 1004:
      return (
        <Modal>
          <ExpiredLogin resetError={resetErrorBoundary} isModal />
        </Modal>
      );
    default:
      return <UnknownError />;
  }
};

export default GlobalErrorUI;
