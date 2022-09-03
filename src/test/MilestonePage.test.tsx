/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@/test/utils';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import { act } from 'react-dom/test-utils';

import * as MilestonesPageStories from '@/pages/Private/Milestones/MilestonesPage.stories';

const { Initial } = composeStories(MilestonesPageStories);

describe('마일스톤 페이지 테스트', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup({ delay: null });

  it('마일스톤 페이지를 조회한다.', async () => {
    const { container } = render(<Initial />);
    await waitFor(() => expect(container).toHaveTextContent('열린 마일스톤'));
    await waitFor(() => expect(container).toHaveTextContent('닫힌 마일스톤'));
  });

  it(`제목이 '새로운 마일스톤'인 마일스톤을 추가한다.`, async () => {
    jest.useFakeTimers();
    render(<Initial />);

    const addMilestoneButton = screen.getByRole('button', {
      name: /추가/i,
    }) as HTMLButtonElement;
    await user.click(addMilestoneButton);

    const titleInput = screen.getByPlaceholderText('마일스톤 이름') as HTMLInputElement;
    await user.type(titleInput, '새로운 마일스톤');
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(titleInput).toHaveValue('새로운 마일스톤');

    const saveMilestoneButton = screen.getByRole('button', {
      name: /완료/i,
    }) as HTMLButtonElement;
    expect(saveMilestoneButton).not.toBeDisabled();
    await user.click(saveMilestoneButton);

    await waitFor(() => {
      const target = screen.getByText('새로운 마일스톤');
      expect(target).toBeInTheDocument();
    });
  });

  it(`마일스톤의 제목을 '마일스톤 1'에서 '마일스톤 123'으로 수정한다.`, async () => {
    jest.useFakeTimers();
    render(<Initial />);

    const modifyMilestoneButton = screen.getAllByText('편집')[0];
    await user.click(modifyMilestoneButton);

    const titleInput = screen.getByPlaceholderText('마일스톤 이름');
    await user.type(titleInput, '23');
    expect(titleInput).toHaveValue('마일스톤 123');
    act(() => {
      jest.advanceTimersByTime(300);
    });

    const saveMilestoneButton = screen.getByRole('button', {
      name: /완료/i,
    }) as HTMLButtonElement;
    expect(saveMilestoneButton).not.toBeDisabled();
    await user.click(saveMilestoneButton);

    await waitFor(() => {
      expect(saveMilestoneButton).not.toBeDisabled();
      const target = screen.getByText('마일스톤 123');
      expect(target).toBeInTheDocument();
    });
  });

  it(`열린 상태인 '마일스톤 123'을 닫는다.`, async () => {
    render(<Initial />);
    const target = await screen.findByText('마일스톤 123');
    expect(target).toBeInTheDocument();

    const closeMilestoneButton = screen.getAllByText('닫기')[0] as HTMLButtonElement;
    await user.click(closeMilestoneButton);

    await waitForElementToBeRemoved(target);
  });

  it(`제목이 '마일스톤 3'인 마일스톤을 삭제한다.`, async () => {
    render(<Initial />);

    const target = await screen.findByText('마일스톤 3');
    expect(target).toBeInTheDocument();

    const deleteMilestoneButton = screen.getAllByText('삭제')[0] as HTMLButtonElement;
    await user.click(deleteMilestoneButton);

    await waitFor(() => {
      const modalDeleteButton = screen.getByRole('button', {
        name: /예/i,
      }) as HTMLButtonElement;
      screen.debug();
      user.click(modalDeleteButton);
    });

    await waitForElementToBeRemoved(target);
  });
});
