/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { composeStories } from '@storybook/testing-react';
import * as SampleHeader from '@/components/Organisms/Header/Header.stories';

const { Initial } = composeStories(SampleHeader);

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('헤더 컴포넌트 테스트', () => {
  const rendering = () => {
    render(<Initial />);

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
    const { profileImage } = rendering();

    await userEvent.click(profileImage);

    const logoutButton = screen.getByRole('button', {
      name: /로그아웃/i,
    }) as HTMLButtonElement;

    await userEvent.click(logoutButton);
    expect(mockedNavigate).toBeCalledTimes(1);
  });
});
