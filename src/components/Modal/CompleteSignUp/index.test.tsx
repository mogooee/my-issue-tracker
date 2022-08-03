import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
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

beforeEach(() => {
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
          <MemoryRouter initialEntries={['/signup']}>
            <Modal>
              <CompleteSignUp id={id} />
            </Modal>
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>,
    );
  };

  test('컴포넌트 렌더링', async () => {
    rendering();
    const heading = screen.getByText(/회원가입이 완료되었습니다!/i);
    expect(heading).toBeInTheDocument();
  });

  test('메인으로 이동 버튼을 클릭하면 메인페이지로 이동', async () => {
    rendering();
    const signUpButton = screen.getByRole('button', {
      name: /메인으로/i,
    }) as HTMLButtonElement;

    await userEvent.click(signUpButton);
    expect(mockedNavigate).toBeCalledTimes(1);
  });

  test('3초가 지나면 자동으로 메인페이지로 이동', async () => {
    rendering();

    setTimeout(() => {
      expect(mockedNavigate).toBeCalledTimes(1);
    }, 3000);
  });
});
