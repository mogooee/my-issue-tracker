/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { server } from '@/mocks/server';

import { render } from '@/test/utils';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';

import { FORM_INFO } from '@/components/Organisms/CommonSignUpForm/constants';
import * as CommonSignUpFormStories from '@/components/Molecules/CommonLoginForm/CommonLoginForm.stories';

const { Initial } = composeStories(CommonSignUpFormStories);

const mockedNavigate = jest.fn();
const resolver = jest.fn();
const duplicateResolver = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('일반 가입 컴포넌트 테스트', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup({ delay: null });

  const rendering = () => {
    render(<Initial />);

    const id = screen.getByPlaceholderText('아이디') as HTMLInputElement;
    const password = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;
    const passwordVerification = screen.getByPlaceholderText('비밀번호 확인') as HTMLInputElement;
    const email = screen.getByPlaceholderText('이메일') as HTMLInputElement;
    const nickname = screen.getByPlaceholderText('닉네임') as HTMLInputElement;
    const signUpButton = screen.getByRole('button', {
      name: /회원가입/i,
    });

    return {
      id,
      password,
      passwordVerification,
      email,
      nickname,
      signUpButton,
    };
  };

  test('컴포넌트 렌더링', async () => {
    const { id, password, passwordVerification, email, nickname } = rendering();

    expect(id).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(passwordVerification).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(nickname).toBeInTheDocument();
  });

  test('아이디 정규식 체크', async () => {
    const { id } = rendering();
    const idRegex = FORM_INFO.find((el) => el.id === 'id')?.pattern!;

    await user.type(id, 'dobby123');
    expect(id.value).toMatch(idRegex);
  });

  test('비밀번호 정규식, 비밀번호 확인 체크', async () => {
    const { password, passwordVerification } = rendering();
    const passwordRegex = FORM_INFO.find((el) => el.id === 'password')?.pattern!;

    await user.type(password, 'dobby1234~!');
    await user.type(passwordVerification, 'dobby1234~!');
    expect(password.value).toMatch(passwordRegex);
    expect(passwordVerification.value).toEqual(password.value);
  });

  test('이메일 정규식 체크', async () => {
    const { email } = rendering();
    const emailRegex = FORM_INFO.find((el) => el.id === 'email')?.pattern!;

    await user.type(email, 'dobby123@gmail.com');
    expect(email.value).toMatch(emailRegex);
  });

  test('닉네임 정규식 체크', async () => {
    const { nickname } = rendering();
    const nicknameRegex = FORM_INFO.find((el) => el.id === 'nickname')?.pattern!;

    await user.type(nickname, '도비');
    expect(nickname.value).toMatch(nicknameRegex);
  });

  test('아이디, 이메일, 닉네임 중복확인', async () => {
    const { id, email, nickname } = rendering();
    server.use(rest.get('api/members/signin-id/:id/exists', duplicateResolver));
    server.use(rest.get('api/members/nickname/:nickname/exists', duplicateResolver));
    server.use(rest.get('api/members/email/:email/exists', duplicateResolver));

    await userEvent.type(id, 'dobby123');
    await userEvent.tab();
    expect(id).not.toHaveFocus();
    await waitFor(() => expect(duplicateResolver).toBeCalledTimes(1));

    await userEvent.type(email, 'dobby123@gmail.com');
    await userEvent.tab();
    expect(email).not.toHaveFocus();
    await waitFor(() => expect(duplicateResolver).toBeCalledTimes(2));

    await userEvent.type(nickname, '도비');
    await userEvent.tab();
    expect(nickname).not.toHaveFocus();
    await waitFor(() => expect(duplicateResolver).toBeCalledTimes(3));
  });

  test('가입하기 버튼 활성화 및 버튼을 클릭하면 회원가입 진행', async () => {
    jest.useFakeTimers();
    server.use(rest.post('api/members/new/general', resolver));
    const { id, password, passwordVerification, email, nickname, signUpButton } = rendering();

    await user.type(id, 'dotori123');
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await user.type(password, 'dotori1234~!');
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await user.type(passwordVerification, 'dotori1234~!');
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await user.type(email, 'dotori123@gmail.com');
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await user.type(nickname, '도토리1234aaa');

    await waitFor(() => expect(signUpButton).not.toBeDisabled());

    await act(async () => {
      await user.click(signUpButton);
    });

    await waitFor(() => expect(resolver).toBeCalledTimes(1));
  });
});
