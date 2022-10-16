import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RedirectAuthTypes, silentRefresh } from '@/api/sign';
import useLogin from '@/api/sign/useLogin';

const Refresh = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const { setSuccessLoginState } = useLogin();
  useQuery<RedirectAuthTypes>(['LoginExtension'], silentRefresh);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const LoginExtensionComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={children}>
    <Refresh>{children}</Refresh>
  </Suspense>
);

export default LoginExtensionComponent;
