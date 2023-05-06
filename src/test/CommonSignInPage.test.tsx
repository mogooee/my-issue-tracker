/* eslint-disable import/no-extraneous-dependencies */
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';

import * as LoginStories from '@/pages/Public/Login/Login.stories';
import { composeStories } from '@storybook/testing-react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { Initial } = composeStories(LoginStories);

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  const renderLoginPageComponent = () => {
    const container = render(
      <RecoilRoot>
        <ThemeProvider theme={THEME}>
          <MemoryRouter>
            <Initial />
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>,
    );

    const id = screen.getByPlaceholderText('아이디') as HTMLInputElement;
    const password = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;
    const signInButton = screen.getByRole('button', {
      name: /아이디로 로그인/i,
    }) as HTMLButtonElement;
    const user = userEvent.setup({ delay: null });

    return {
      container,
      id,
      password,
      signInButton,
      user,
    };
  };

  it('로그인 페이지를 조회한다.', async () => {
    const { id, password, signInButton } = renderLoginPageComponent();
    await waitFor(() => {
      expect(id).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(signInButton).toBeInTheDocument();
    });
  });

  it('아이디만 입력하면 로그인 버튼이 활성화되지 않는다.', async () => {
    const { id, signInButton, user } = renderLoginPageComponent();
    await user.type(id, 'WebTest');
    await waitFor(() => {
      expect(id).toHaveValue('WebTest');
      expect(signInButton).toBeDisabled();
    });
  });

  it('패스워드만 입력하면 로그인 버튼이 활성화되지 않는다.', async () => {
    const { password, signInButton, user } = renderLoginPageComponent();
    await user.type(password, 'test1234');
    await waitFor(() => {
      expect(password).toHaveValue('test1234');
      expect(signInButton).toBeDisabled();
    });
  });

  it('아이디 WebTest와 패스워드 test1234를 입력하면 로그인 버튼이 활성화 된다.', async () => {
    const { id, password, signInButton, user } = renderLoginPageComponent();
    await user.type(id, 'WebTest');
    await user.type(password, 'test1234');
    await waitFor(() => {
      expect(signInButton).not.toBeDisabled();
    });
  });

  it('유효하지 않은 정보로 로그인을 시도하면 에러가 발생한다.', async () => {
    const { id, password, signInButton, user } = renderLoginPageComponent();
    await user.type(id, 'test');
    await user.type(password, 'test5678');
    await user.click(signInButton);
    await waitFor(() => {
      expect(screen.getByText(/아이디 또는 비밀번호를 잘못 입력했습니다./i)).toBeInTheDocument();
      expect(mockedNavigate).toBeCalledTimes(0);
    });
  });

  it('유효한 정보로 로그인하면 토큰이 생성되고 페이지를 이동한다.', async () => {
    const { id, password, signInButton, user } = renderLoginPageComponent();
    await user.type(id, 'WebTest');
    await user.type(password, 'test1234');
    await user.click(signInButton);
    await waitFor(() => {
      expect(document.cookie).toEqual('access_token=access123');
      expect(mockedNavigate).toBeCalledTimes(1);
    });
  });
});
