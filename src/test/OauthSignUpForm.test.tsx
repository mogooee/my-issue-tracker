/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { server } from '@/mocks/server';

import { RecoilRoot } from 'recoil';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';
import OAuthSignUpForm from '@/components/Organisms/OauthSignUpForm';

const mockedNavigate = jest.fn();
const resolver = jest.fn();
const duplicateResolver = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

describe('OAuth가입 컴포넌트 테스트', () => {
  const rendering = () => {
    const signUpFormData = {
      resourceOwnerId: 'string',
      email: 'testDobby@gmail.com',
      profileImage: 'string',
    };

    render(
      <RecoilRoot>
        <ThemeProvider theme={THEME}>
          <OAuthSignUpForm SignUpFormData={signUpFormData} />
        </ThemeProvider>
      </RecoilRoot>,
    );

    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    const signUpButton = screen.getByRole('button', {
      name: /동의하고 가입하기/i,
    }) as HTMLButtonElement;

    return {
      nickname,
      signUpButton,
    };
  };

  test('컴포넌트 렌더링', async () => {
    const { nickname } = rendering();
    expect(nickname).toBeInTheDocument();
  });

  test('닉네임 정규식 체크', async () => {
    const { nickname } = rendering();
    const nicknameRegex = /^[ㄱ-힣a-zA-Z0-9-*~^_]{2,12}$/i;

    await userEvent.type(nickname, '도비');
    expect(nickname.value).toMatch(nicknameRegex);
  });

  test('닉네임 중복확인', async () => {
    const { nickname } = rendering();
    server.use(rest.get('api/members/nickname/:nickname/exists', duplicateResolver));

    await userEvent.type(nickname, '도비123');
    await userEvent.tab();
    expect(nickname).not.toHaveFocus();

    await waitFor(() => expect(duplicateResolver).toBeCalledTimes(1));
  });

  test('가입하기 버튼 활성화 및 버튼을 클릭하면 회원가입 진행', async () => {
    server.use(rest.post('api/members/new/auth', resolver));
    const { nickname, signUpButton } = rendering();

    await userEvent.type(nickname, '도비');
    await waitFor(() => {
      expect(signUpButton).not.toBeDisabled();
    });
    await userEvent.click(signUpButton);
    // post가 정상적으로 되었는지 확인
    expect(resolver).toBeCalledTimes(1);
    // // navigate가 정상적으로 이동되었는지 확인
    expect(mockedNavigate).toBeCalledTimes(1);
  });
});
