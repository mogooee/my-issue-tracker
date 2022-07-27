import { rest } from 'msw';
import { server } from '@/mocks/server';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

const mockedNavigate = jest.fn();
const resolver = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

describe('OAuth가입 컴포넌트 테스트', () => {
  const rendering = () => {
    const authData = { email: 'dobby@gmail.com' };
    render(
      <RecoilRoot>
        <ThemeProvider theme={THEME}>
          <MemoryRouter initialEntries={['/']}>
            <OAuthSignUpForm authData={authData} />
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>,
    );
  };

  test('컴포넌트 렌더링', async () => {
    rendering();
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    expect(nickname).toBeInTheDocument();
  });

  test('닉네임 정규식 체크', async () => {
    rendering();
    const nicknameRegex = /^[ㄱ-힣a-zA-Z0-9-*~^_]{2,12}$/i;
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;

    await userEvent.type(nickname, '도비');
    expect(nickname.value).toMatch(nicknameRegex);
  });

  test('동의하고 가입하기 버튼 활성화', async () => {
    rendering();

    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    const signUpButton = screen.getByRole('button', {
      name: /동의하고 가입하기/i,
    });

    await userEvent.type(nickname, '도비');
    expect(signUpButton).not.toBeDisabled();
  });

  test('가입하기 버튼을 클릭하면 회원가입 진행', async () => {
    server.use(rest.post('members/new/auth', resolver));
    rendering();

    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    const signUpButton = screen.getByRole('button', {
      name: /동의하고 가입하기/i,
    }) as HTMLButtonElement;

    await userEvent.type(nickname, '도비');
    await userEvent.click(signUpButton);

    // post가 정상적으로 되었는지 확인
    expect(resolver).toBeCalledTimes(1);
    // navigate가 정상적으로 이동되었는지 확인
    expect(mockedNavigate).toBeCalledTimes(1);
  });
});
