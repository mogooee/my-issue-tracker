import { rest } from 'msw';
import { server } from '@/mocks/server';

import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';
import CommonSignUpForm from '@/components/Organisms/CommonSignUpForm';
import { FORM_INFO } from './constants';

const mockedNavigate = jest.fn();
const resolver = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

afterEach(cleanup);

describe('일반 가입 컴포넌트 테스트', () => {
  const rendering = () => {
    render(
      <RecoilRoot>
        <ThemeProvider theme={THEME}>
          <MemoryRouter initialEntries={['/']}>
            <CommonSignUpForm FORM_INFO={FORM_INFO} />
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>,
    );
  };

  test('컴포넌트 렌더링', async () => {
    rendering();
    const id = screen.getByPlaceholderText('아이디') as HTMLInputElement;
    const password = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;
    const passwordVerification = screen.getByPlaceholderText('비밀번호 확인') as HTMLInputElement;
    const email = screen.getByPlaceholderText('이메일') as HTMLInputElement;
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;

    expect(id).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(passwordVerification).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(nickname).toBeInTheDocument();
  });

  test('아이디 정규식 체크', async () => {
    rendering();
    const idRegex = FORM_INFO.find((el) => el.id === 'id')?.pattern!;
    const id = screen.getByPlaceholderText('아이디') as HTMLInputElement;

    await userEvent.type(id, 'dobby123');
    expect(id.value).toMatch(idRegex);
  });

  test('비밀번호 정규식, 비밀번호 확인 체크', async () => {
    rendering();
    const passwordRegex = FORM_INFO.find((el) => el.id === 'password')?.pattern!;
    const password = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;
    const passwordVerification = screen.getByPlaceholderText('비밀번호 확인') as HTMLInputElement;

    await userEvent.type(password, 'dobby1234~!');
    await userEvent.type(passwordVerification, 'dobby1234~!');
    expect(password.value).toMatch(passwordRegex);
    expect(passwordVerification.value).toEqual(password.value);
  });

  test('이메일 정규식 체크', async () => {
    rendering();
    const emailRegex = FORM_INFO.find((el) => el.id === 'email')?.pattern!;
    const email = screen.getByPlaceholderText('이메일') as HTMLInputElement;

    await userEvent.type(email, 'dobby123@gmail.com');
    expect(email.value).toMatch(emailRegex);
  });

  test('닉네임 정규식 체크', async () => {
    rendering();
    const nicknameRegex = FORM_INFO.find((el) => el.id === 'nickname')?.pattern!;
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;

    await userEvent.type(nickname, '도비');
    expect(nickname.value).toMatch(nicknameRegex);
  });

  test('가입하기 버튼 활성화', async () => {
    rendering();

    const id = screen.getByPlaceholderText('아이디') as HTMLInputElement;
    const password = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;
    const passwordVerification = screen.getByPlaceholderText('비밀번호 확인') as HTMLInputElement;
    const email = screen.getByPlaceholderText('이메일') as HTMLInputElement;
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    const signUpButton = screen.getByRole('button', {
      name: /회원가입/i,
    });

    await userEvent.type(id, 'dotori123');
    await userEvent.type(password, 'dotori1234~!');
    await userEvent.type(passwordVerification, 'dotori1234~!');
    await userEvent.type(email, 'dotori123@gmail.com');
    await userEvent.type(nickname, '도토리1234aaa');

    await waitFor(() => expect(signUpButton).not.toBeDisabled());
  });

  test('가입하기 버튼을 클릭하면 회원가입 진행', async () => {
    server.use(rest.post('api/members/new/general', resolver));
    rendering();

    const id = screen.getByPlaceholderText('아이디') as HTMLInputElement;
    const password = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;
    const passwordVerification = screen.getByPlaceholderText('비밀번호 확인') as HTMLInputElement;
    const email = screen.getByPlaceholderText('이메일') as HTMLInputElement;
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    const signUpButton = screen.getByRole('button', {
      name: /회원가입/i,
    });

    await userEvent.type(id, 'dotori123');
    await userEvent.type(password, 'dotori1234~!');
    await userEvent.type(passwordVerification, 'dotori1234~!');
    await userEvent.type(email, 'dotori123@gmail.com');
    await userEvent.type(nickname, '도토리');

    await waitFor(() => {
      expect(signUpButton).not.toBeDisabled();
    });
    await userEvent.click(signUpButton);
    // post가 정상적으로 되었는지 확인
    expect(resolver).toBeCalledTimes(1);

    // 3초 뒤에 자동으로 navigate가 정상적으로 이동되었는지 확인
    setTimeout(() => {
      expect(mockedNavigate).toBeCalledTimes(1), 3000;
    });
  });
});
