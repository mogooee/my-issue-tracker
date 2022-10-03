/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
import React, { PropsWithChildren } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorMessage } from '@/api/constants';

import { SetterOrUpdater, useRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';

import { NotFound } from '@/pages';
import LoginExtensionComponent from '@/components/ErrorBoundary/Refresh';

type FallbackRenderPropsType = {
  resetErrorBoundary: () => void;
};

declare function FallbackRender(props: FallbackRenderPropsType): React.ReactElement<React.FunctionComponent>;

interface ErrorBoundaryProps {
  navigate: NavigateFunction;
  isOAuth: boolean;
  setIsOAuth: SetterOrUpdater<boolean>;
  queryClient: QueryClient;
  fallbackRender?: typeof FallbackRender;
}

interface ErrorBoundaryState {
  error: AxiosError<ErrorMessage> | null;
}

const initErrorState: ErrorBoundaryState = { error: null };

class ErrorBoundary extends React.Component<
  React.PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithRef<PropsWithChildren<ErrorBoundaryProps>> & ErrorBoundaryState) {
    super(props);
    this.state = initErrorState;
  }

  static getDerivedStateFromError(error: AxiosError<ErrorMessage>) {
    return { error };
  }

  componentDidUpdate(_: never, prevState: ErrorBoundaryState) {
    const { error } = this.state;

    const errorCode = error?.response?.data.errorCode;
    const prevErrorCode = prevState.error?.response?.data.errorCode;

    if (!error) return;

    }
  }

  reset() {
    this.setState(initErrorState);

    const { queryClient } = this.props;
    queryClient.clear();
  }

  render() {
    const { children, navigate, isOAuth, setIsOAuth, fallbackRender } = this.props;
    const { error } = this.state;

    if (error) {
      const { status, data } = error.response!;

      if (status === 500) {
        return <div>server 500 Error</div>;
      }

      switch (data.errorCode) {

        case 1002:
        case 1004:
          return (
            <button
              type="button"
              onClick={() => {
                if (isOAuth) {
                  setIsOAuth(false);
                }
                window.localStorage.removeItem('Authentication');
                navigate('/login');
                this.reset();
              }}
            >
              로그인 페이지로 이동
            </button>
          );

        // oauth 로그인시 리다이렉트로 돌아오는 코드가 유효하지 않음
        case 2001:
          return (
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem('Authentication');
                navigate('/login');
                this.reset();
              }}
            >
              메인으로
            </button>
          );

        // (으)로 이미 가입된 이메일입니다.
        case 2103:
          // 클릭핸들러에 reset 추가
          return <div>{data.message}</div>;

        case 3000:
          return (
            <>
              <NotFound />
              <button
                type="button"
                onClick={() => {
                  navigate('/issues');
                  this.reset();
                }}
              >
                이슈 페이지로 이동
              </button>
            </>
          );
      }

      if (fallbackRender) {
        const fallbackRenderProps: FallbackRenderPropsType = {
          resetErrorBoundary: this.reset.bind(this),
        };

        return fallbackRender(fallbackRenderProps);
      }
    }

    return children;
  }
}

interface CustomErrorBoundaryTypes {
  fallbackRender?: typeof FallbackRender;
  children: React.ReactNode;
}

const CustomErrorBoundary = ({ children, fallbackRender }: CustomErrorBoundaryTypes) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOAuth, setIsOAuth] = useRecoilState(OAuthState);

  return (
    <ErrorBoundary
      navigate={navigate}
      queryClient={queryClient}
      isOAuth={isOAuth}
      setIsOAuth={setIsOAuth}
      fallbackRender={fallbackRender}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
