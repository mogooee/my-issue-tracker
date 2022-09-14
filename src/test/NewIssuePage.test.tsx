/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import { act } from 'react-dom/test-utils';

import * as NewIssuePageStories from '@/pages/Private/NewIssue/NewIssue.stories';

const { Initial } = composeStories(NewIssuePageStories);

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

// eslint-disable-next-line arrow-body-style
jest.mock('react-markdown', () => {
  return ({ children }: any) => children;
});

jest.mock('remark-gfm', () => () => {});

describe('이슈 생성 페이지 테스트', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup({ delay: null });

  it('이슈 생성 페이지를 조회한다.', async () => {
    const { container } = render(<Initial />);

    await waitFor(() => {
      expect(container).toHaveTextContent('새로운 이슈 작성');
    });
  });

  it(`제목에 '이슈 생성 테스트'를 입력하면 완료 버튼이 활성화 된다.`, async () => {
    jest.useFakeTimers();
    render(<Initial />);

    const title = screen.getByPlaceholderText('제목') as HTMLInputElement;
    await user.type(title, '이슈 생성 테스트');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(title).toHaveValue('이슈 생성 테스트');
    });

    await waitFor(() => {
      const createNewIssueButton = screen.getByRole('button', {
        name: /완료/i,
      }) as HTMLButtonElement;
      expect(createNewIssueButton).not.toBeDisabled();
    });
  });

  it(`사이드 바의 담당자를 클릭한 후, 이름이 '도비'인 유저를 추가한다.`, async () => {
    jest.useFakeTimers();
    const { container } = render(<Initial />);

    const assignees = container.querySelectorAll('.sidebar_item')[0];
    await user.click(assignees);

    await waitFor(() => {
      const dobby = screen.getByText('도비');
      expect(dobby).toBeInTheDocument();
    });

    const dobbyInput = assignees.querySelector('input[data-id="도비"]')!;
    await user.click(dobbyInput);

    await waitFor(() => {
      const contentList = assignees.querySelector('.content_list')!;
      expect(contentList).toHaveTextContent('도비');
    });
  });

  it(`사이드 바의 레이블를 클릭한 후, 이름이 'Feature'인 레이블을 추가한다.`, async () => {
    jest.useFakeTimers();
    const { container } = render(<Initial />);

    const labels = container.querySelectorAll('.sidebar_item')[1];
    await user.click(labels);

    await waitFor(() => {
      const feature = screen.getByText('Feature');
      expect(feature).toBeInTheDocument();
    });

    const featureInput = labels.querySelector('input[data-id="Feature"]')!;
    await user.click(featureInput);

    await waitFor(() => {
      const contentList = labels.querySelector('.content_list')!;
      expect(contentList).toHaveTextContent('Feature');
    });
  });

  it(`사이드 바의 마일스톤을 클릭한 후, 이름이 '마일스톤 1'인 마일스톤을 추가한다.`, async () => {
    jest.useFakeTimers();
    const { container } = render(<Initial />);

    const milestone = container.querySelectorAll('.sidebar_item')[2];
    await user.click(milestone);

    await waitFor(() => {
      const milestoneItem = screen.getByText('마일스톤 1');
      expect(milestoneItem).toBeInTheDocument();
    });

    const itmeInput = milestone.querySelector('input[data-id="마일스톤 1"]')!;
    await user.click(itmeInput);

    await waitFor(() => {
      const contentList = milestone.querySelector('.content_list')!;
      expect(contentList).toHaveTextContent('마일스톤 1');
    });
  });

  it(`제목이 '새로운 이슈 생성'이고 담당자가 도비, 레이블이 feature인 이슈를 생성한다.`, async () => {
    jest.useFakeTimers();
    const { container } = render(<Initial />);

    const title = screen.getByPlaceholderText('제목') as HTMLInputElement;
    await user.type(title, '이슈 생성 테스트');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const assignees = container.querySelectorAll('.sidebar_item')[0];
    const dobbyInput = assignees.querySelector('input[data-id="도비"]')!;
    await user.click(dobbyInput);

    const labels = container.querySelectorAll('.sidebar_item')[1];
    const featureInput = labels.querySelector('input[data-id="Feature"]')!;
    await user.click(featureInput);

    await waitFor(() => {
      const assigneesContentList = assignees.querySelector('.content_list')!;
      expect(assigneesContentList).toHaveTextContent('도비');

      const labelContentList = labels.querySelector('.content_list')!;
      expect(labelContentList).toHaveTextContent('Feature');
    });

    const createNewIssueButton = screen.getByRole('button', {
      name: /완료/i,
    }) as HTMLButtonElement;
    await user.click(createNewIssueButton);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledTimes(1);
    });
  });
});
