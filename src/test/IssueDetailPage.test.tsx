/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { server } from '@/mocks/server';

import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { composeStories } from '@storybook/testing-react';
import * as SampleIssueDetail from '@/pages/Private/IssueDetail/index.stories';
import { render } from '@/test/utils';
import { MemoryRouter } from 'react-router-dom';

const { Initial } = composeStories(SampleIssueDetail);

let DOMContainer = null;

jest.mock(
  'react-markdown',
  () =>
    ({ children }: any) =>
      children,
);

jest.mock('remark-gfm', () => () => {});

beforeAll(() => {
  DOMContainer = document.createElement('div');
  document.body.appendChild(DOMContainer);
  DOMContainer.id = 'modal-root';
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const DEBOUNCE_DELAY = 200;

describe('이슈 상세페이지 테스트', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup({ delay: null });

  const renderIssueDetailComponent = () =>
    render(
      <MemoryRouter initialEntries={['/issues/9']}>
        <Initial />
      </MemoryRouter>,
    );

  test('페이지 렌더링(이슈 단건 조회)', async () => {
    const { container } = renderIssueDetailComponent();
    await waitFor(() => expect(container).toHaveTextContent('#9'));
  });

  test('이슈 제목 수정', async () => {
    jest.useFakeTimers();
    renderIssueDetailComponent();

    const titleEditButton = screen.getByRole('button', {
      name: /^제목 편집$/i,
    }) as HTMLButtonElement;
    await user.click(titleEditButton);

    const titleEditForm = screen.getByPlaceholderText('제목') as HTMLInputElement;
    await user.clear(titleEditForm);
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    await user.type(titleEditForm, '수정된 제목');
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });

    const titleEditSaveButton = screen.getByRole('button', {
      name: /^편집 완료$/i,
    }) as HTMLButtonElement;
    await user.click(titleEditSaveButton);

    await waitFor(() => {
      const newTitle = screen.getByRole('heading', { name: /수정된 제목/i });
      expect(newTitle).toBeInTheDocument();
    });
  });

  test('이슈 상태 변경', async () => {
    jest.useFakeTimers();
    renderIssueDetailComponent();

    const openState = screen.getByText('열린 이슈');
    expect(openState).toBeInTheDocument();

    const issueCloseButton = screen.getByRole('button', {
      name: /이슈 닫기/i,
    }) as HTMLButtonElement;
    await user.click(issueCloseButton);

    await waitFor(() => {
      const closedState = screen.getByText('닫힌 이슈');
      expect(closedState).toBeInTheDocument();
    });
  });

  test('이슈 코멘트 등록', async () => {
    renderIssueDetailComponent();

    const newCommentBox = screen.getByRole('textbox');
    await user.type(newCommentBox, '새로운 코멘트를 추가합니다.');

    const addNewCommentButton = screen.getByRole('button', {
      name: /추가/i,
    }) as HTMLButtonElement;

    await waitFor(() => {
      expect(addNewCommentButton).not.toBeDisabled();
      user.click(addNewCommentButton);
    });

    await waitFor(() => expect(screen.getByText('새로운 코멘트를 추가합니다.')).toBeInTheDocument());
  });

  test('이슈 코멘트 수정', async () => {
    renderIssueDetailComponent();

    const editCommentButton = screen.getAllByText('편집')[1];
    await user.click(editCommentButton);

    const comment = screen.getByText('새로운 코멘트를 추가합니다.');
    await user.clear(comment);
    await user.type(comment, '코멘트를 수정합니다.');

    const editSaveCommentButton = screen.getByRole('button', {
      name: /편집 완료/i,
    }) as HTMLButtonElement;
    await waitFor(() => {
      expect(editSaveCommentButton).not.toBeDisabled();
      user.click(editSaveCommentButton);
    });

    await waitFor(() => expect(screen.getByText('코멘트를 수정합니다.')).toBeInTheDocument());
  });

  test('이슈 코멘트 삭제', async () => {
    renderIssueDetailComponent();

    const comment = screen.getByText('코멘트를 수정합니다.');

    const deleteCommentButton = screen.getAllByText('삭제')[0];
    await user.click(deleteCommentButton);

    await waitFor(() => {
      const deleteCheckModal = screen.getByRole('heading', { name: /정말 삭제하시겠습니까?/i });
      expect(deleteCheckModal).toBeInTheDocument();
    });

    const deleteCheckButton = screen.getByRole('button', {
      name: /확인/i,
    }) as HTMLButtonElement;
    expect(deleteCheckButton).toBeInTheDocument();
    await user.click(deleteCheckButton);

    await waitFor(() => expect(comment).not.toBeInTheDocument());
  });

  test('이슈 코멘트 리액션 추가 및 삭제', async () => {
    renderIssueDetailComponent();

    const reaction = screen.getByText('👍 1');

    const emojiDropdown = screen.getAllByTestId('Smile')[0];
    await user.click(emojiDropdown);

    const thumbsUpReactionButton = screen.getAllByRole('button', {
      name: /👍/i,
    })[0];

    // 리액션 추가
    await user.click(thumbsUpReactionButton);
    await waitFor(() => {
      const newReaction = screen.getByText('👍 2');
      expect(newReaction).toBeInTheDocument();
    });

    // 리액션 삭제
    await user.click(thumbsUpReactionButton);
    await waitFor(() => expect(reaction).toBeInTheDocument());
  });
});
