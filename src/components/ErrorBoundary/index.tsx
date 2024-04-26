/* eslint-disable max-classes-per-file */
import React, { PropsWithChildren, memo } from 'react';

import { QueryClient, QueryErrorResetBoundary, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CustomErrorCode, ErrorMessage } from '@/api/constants';

export type FallbackRenderPropsType = {
  resetErrorBoundary: () => void;
  status: number;
  errorCode: CustomErrorCode;
  children?: React.ReactNode;
};

export type FallbackRenderType = (props: FallbackRenderPropsType) => React.ReactElement<React.FunctionComponent>;

interface CustomErrorBoundaryProps {
  resetKeys?: string[];
  fallbackRender: FallbackRenderType;
  children: React.ReactNode;
}

type ErrorBoundaryProps = {
  onReset: () => void;
} & Omit<CustomErrorBoundaryProps, 'resetKeys'>;

interface ErrorBoundaryState {
  hasError: false;
  error: AxiosError<ErrorMessage> | null;
}

const initErrorState: ErrorBoundaryState = { error: null, hasError: false };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initErrorState;
  }

  static getDerivedStateFromError(error: AxiosError<ErrorMessage>) {
    return { error, hasError: true };
  }

  resetErrorBoundary(...args: any[]) {
    const { onReset } = this.props;
    const { error } = this.state;

    if (error !== null) {
      onReset?.();
      this.setState(initErrorState);
    }
  }

  render() {
    const { children, fallbackRender } = this.props;
    const { error } = this.state;

    if (error !== null) {
      const fallbackRenderProps: FallbackRenderPropsType = {
        resetErrorBoundary: this.resetErrorBoundary,
        status: error.response!.status,
        errorCode: error.response!.data.errorCode,
      };

      if (fallbackRender) {
        return fallbackRender(fallbackRenderProps);
      }

      // console.error('error-boundary require fallbackRender prop');
      throw error;
    }

    return children;
  }
}

const resetErrorQuery = (queryClient: QueryClient) => {
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().filter((q) => q.state.status === 'error');

  if (queryKeys) {
    queryKeys.forEach(({ queryKey }) => {
      queryClient.resetQueries({ queryKey });
    });
  }
};

class GeneralErrorBoundary extends ErrorBoundary {
  static getDerivedStateFromError(error: AxiosError<ErrorMessage>) {
    const { data, status } = error.response as AxiosResponse<ErrorMessage>;

    const isServerError: boolean = status >= 500;
    const isTokenError: boolean = data.errorCode >= 1000 && data.errorCode < 2000;

    // 공통에러면 hasError는 false로 두어 general에서 처리하지 않는다.
    if (isServerError || isTokenError) {
      return { error, hasError: false };
    }

    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { hasError } = this.state;

    // 에러는 있지만 잡을 수 없는 에러 = 상위 에러바운더리로 던져야 하는 에러
    if (error !== null && hasError === false) {
      this.resetErrorBoundary();
      throw error;
    }
  }
}

const CustomErrorBoundary = ({ resetKeys, fallbackRender, children }: CustomErrorBoundaryProps) => {
  const queryClient = useQueryClient();
  const isGlobal = resetKeys?.[0] === 'global';

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        const onReset = () => {
          reset();
          resetErrorQuery(queryClient);
        };

        const errorBoundaryProps = {
          fallbackRender,
          onReset,
        };

        return isGlobal ? (
          <ErrorBoundary {...errorBoundaryProps}>{children}</ErrorBoundary>
        ) : (
          <GeneralErrorBoundary {...errorBoundaryProps}>{children}</GeneralErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
};

export default memo(CustomErrorBoundary);
