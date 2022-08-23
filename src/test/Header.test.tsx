/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { server } from '@/mocks/server';

import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';
import Header from '@/components/Organisms/Header';
import { MemoryRouter } from 'react-router-dom';

const mockedNavigate = jest.fn();
const resolver = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('헤더 컴포넌트 테스트', () => {
  const rendering = () => {
    const user = {
      id: 1,
      email: 'dobby@gmail.com',
      nickname: 'dobby',
      profileImage: 'https://avatars.githubusercontent.com/u/85747667?s=96&v=4',
    };

    render(
      <RecoilRoot>
        <ThemeProvider theme={THEME}>
          <MemoryRouter initialEntries={['/']}>
            <Header user={user} />
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>,
    );

    const profileImage = screen.getByRole('img', {
      name: /dobby의 프로필 사진/i,
    });

    return {
      profileImage,
    };
  };

  test('컴포넌트 렌더링', async () => {
    const { profileImage } = rendering();
    expect(profileImage).toBeInTheDocument();
  });

  test('로그아웃 버튼 활성화 및 버튼을 클릭하면 로그아웃 진행', async () => {
    server.use(rest.head('api/members/signout', resolver));
    const { profileImage } = rendering();

    await userEvent.click(profileImage);

    const logoutButton = screen.getByRole('button', {
      name: /로그아웃/i,
    }) as HTMLButtonElement;
    expect(logoutButton).toBeInTheDocument();

    await userEvent.click(logoutButton);
    expect(resolver).toBeCalledTimes(1);
    expect(mockedNavigate).toBeCalledTimes(1);
  });
});
