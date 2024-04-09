import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RedirectAuthTypes, silentRefresh } from '@/api/sign';
import useLogin from '@/api/sign/useLogin';

import Modal from '@/components/Modal';

import styled from 'styled-components';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

const StyledRefreshUI = styled.div`
  h1 {
    ${({ theme }) => theme.FONTSTYLES.DISPLAY_REGULER};
    margin-bottom: 8px;
  }

  div {
    position: relative;
  }
`;

export const RefreshUI = () => (
  <StyledRefreshUI>
    <h1>로그인을 갱신 중 입니다.</h1>
    <LoadingSpinner size={70} />
  </StyledRefreshUI>
);

const Refresh = ({ resetError }: { resetError: () => void }): React.ReactElement => {
  const { setSuccessLoginState } = useLogin();
  useQuery<RedirectAuthTypes>(['LoginExtension'], silentRefresh, {
    onSuccess: () => {
      setSuccessLoginState();
      resetError();
    },
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

const LoginExtensionComponent = ({ resetError }: { resetError: () => void }) => (
  <Suspense
    fallback={
      <Modal>
        <RefreshUI />
      </Modal>
    }
  >
    <Refresh resetError={resetError} />
  </Suspense>
);

export default LoginExtensionComponent;
