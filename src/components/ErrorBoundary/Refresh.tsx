import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RedirectAuthTypes, silentRefresh } from '@/api/sign';
import CustomErrorBoundary from '@/components/ErrorBoundary/index';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

const Refresh = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  useQuery<RedirectAuthTypes>(['LoginExtension'], silentRefresh);
  return <div className="refresh">{children}</div>;
};

const LoginExtensionComponent = ({ children }: { children: React.ReactNode }) => (
  <CustomErrorBoundary>
    <Suspense fallback={<LoadingSpinner size={80} />}>
      <Refresh>{children}</Refresh>
    </Suspense>
  </CustomErrorBoundary>
);

export default LoginExtensionComponent;
