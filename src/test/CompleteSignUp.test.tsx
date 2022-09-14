/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';

import Modal from '@/components/Modal/index';
import CompleteSignUp from '@/components/Modal/CompleteSignUp';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

let container = null;

beforeAll(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  container.id = 'modal-root';
});

describe('일반 가입 컴포넌트 테스트', () => {
  const rendering = () => {
    const id = '도토리123';
    render(
      <RecoilRoot>
        <ThemeProvider theme={THEME}>
          <Modal>
            <CompleteSignUp id={id} />
          </Modal>
        </ThemeProvider>
      </RecoilRoot>,
    );
    const heading = screen.getByText(/회원가입이 완료되었습니다!/i);
    const signUpButton = screen.getByRole('button', {
      name: /메인으로/i,
    }) as HTMLButtonElement;

    return {
      heading,
      signUpButton,
    };
  };

  test('컴포넌트 렌더링', async () => {
    const { heading } = rendering();
    expect(heading).toBeInTheDocument();
  });

  test('메인으로 이동 버튼을 클릭하면 메인페이지로 이동', async () => {
    const { signUpButton } = rendering();

    await userEvent.click(signUpButton);

    expect(mockedNavigate).toBeCalledTimes(1);
    mockedNavigate.mockClear();
  });

  test('3초가 지나면 자동으로 메인페이지로 이동', async () => {
    jest.useFakeTimers();
    rendering();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(mockedNavigate).toBeCalledTimes(1);

    jest.useRealTimers();
  });
});
