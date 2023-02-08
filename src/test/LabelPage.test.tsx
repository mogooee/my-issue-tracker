/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { server } from '@/mocks/server';

import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { composeStories } from '@storybook/testing-react';
import * as SampleLabelList from '@/pages/Private/Labels/Labels.stories';
import { render } from '@/test/utils';
import { MemoryRouter } from 'react-router-dom';

const { Initial } = composeStories(SampleLabelList);

let DOMContainer = null;

beforeAll(() => {
  DOMContainer = document.createElement('div');
  document.body.appendChild(DOMContainer);
  DOMContainer.id = 'modal-root';
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const DEBOUNCE_DELAY = 200;

describe('라벨 페이지 테스트', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup({ delay: null });
  const renderLablePageComponent = () =>
    render(
      <MemoryRouter initialEntries={['/labels']}>
        <Initial />
      </MemoryRouter>,
    );

  test('페이지 렌더링(레이블 조회)', async () => {
    const { container } = renderLablePageComponent();
    await waitFor(() => expect(container).toHaveTextContent('개의 레이블'));
  });

  test('레이블 등록', async () => {
    jest.useFakeTimers();
    renderLablePageComponent();

    // 추가버튼을 누르면 새로운 레이블 추가 폼이 나타난다.
    const addButton = screen.getByRole('button', {
      name: /추가/i,
    }) as HTMLButtonElement;
    await user.click(addButton);

    const addForm = screen.getByRole('heading', {
      name: /새로운 레이블 추가/i,
    });
    expect(addForm).toBeInTheDocument();

    // 레이블의 제목과 설명을 타이핑하고 글자색상과 배경색상을 버튼 클릭으로 변경한다.
    const title = screen.getByPlaceholderText('레이블 이름') as HTMLInputElement;
    const description = screen.getByPlaceholderText('설명(선택)') as HTMLInputElement;
    const textColor = screen.getByText(/밝은 색/i);
    const refreshButton = screen.getByTestId('RefreshCcw');

    await user.type(title, '새로운 레이블');
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    await user.type(description, '등록합니다.');
    await user.click(refreshButton);
    await user.click(textColor);

    // 활성화된 완료버튼을 누른다.
    const completeButton = screen.getByRole('button', {
      name: /완료/i,
    }) as HTMLButtonElement;
    await waitFor(() => {
      expect(completeButton).not.toBeDisabled();
    });
    await user.click(completeButton);

    // 레이블 목록에 새로운 레이블이 추가된다.
    await waitFor(() => {
      const newTitle = screen.getByText(/새로운 레이블/i);
      expect(newTitle).toBeInTheDocument();
    });
  });

  test('레이블 삭제', async () => {
    renderLablePageComponent();
    const deletedLabel = screen.getByText(/Feature/i);
    expect(deletedLabel).toBeInTheDocument();

    const deleteButton = screen.getAllByRole('button', {
      name: /삭제/i,
    })[0] as HTMLButtonElement;
    await user.click(deleteButton);

    await waitFor(() => {
      const completeButton = screen.getByRole('button', {
        name: /확인/i,
      }) as HTMLButtonElement;
      screen.debug();
      user.click(completeButton);
    });

    await waitForElementToBeRemoved(deletedLabel);
    expect(deletedLabel).not.toBeInTheDocument();
  });

  test('레이블 수정', async () => {
    jest.useFakeTimers();
    renderLablePageComponent();

    // 편집버튼을 누르면 레이블 편집폼이 나타난다.
    const editButton = screen.getAllByRole('button', {
      name: /편집/i,
    })[0] as HTMLButtonElement;
    await user.click(editButton);

    const editForm = screen.getByRole('heading', {
      name: /레이블 편집/i,
    });
    expect(editForm).toBeInTheDocument();

    const title = screen.getByPlaceholderText('레이블 이름') as HTMLInputElement;
    const description = screen.getByPlaceholderText('설명(선택)') as HTMLInputElement;

    await user.type(title, ' 수정된 레이블');
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    await user.type(description, ' 수정합니다.');

    // 활성화된 완료버튼을 누른다.
    const completeButton = screen.getByRole('button', {
      name: /완료/i,
    }) as HTMLButtonElement;
    await waitFor(() => {
      expect(completeButton).not.toBeDisabled();
    });
    await user.click(completeButton);

    // 레이블 목록에 수정된 레이블이 나타난다.
    await waitFor(() => {
      const editTitle = screen.getByText(/Docs 수정된 레이블/i);
      expect(editTitle).toBeInTheDocument();
    });
  });

  test('레이블을 클릭하면 이슈페이지로 이동', async () => {
    renderLablePageComponent();
    const label = screen.getByText(/Bugs/i);
    const labelHref = '/issues?page=0&q=label%3A"Bugs"';

    await act(async () => {
      await user.click(label);
      window.history.pushState({}, 'Test-Page', labelHref);
    });

    const FilterBar = screen.getByPlaceholderText('Search all issues') as HTMLInputElement;
    expect(FilterBar).toHaveValue('label:Bugs');
  });
});
