/* eslint-disable import/no-extraneous-dependencies */
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import THEME from '@/styles/theme';

import { render } from '@testing-library/react';
import { server } from '@/mocks/server';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.append(modalRoot);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={THEME}>
          <MemoryRouter initialEntries={['/']}>
            <div id="root">{children}</div>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const mockStoryHandlers = (story: JSX.Element) => server.use(...(story.type.parameters?.msw?.handlers || []));

const customRender = (ui: JSX.Element, options?: any) => {
  mockStoryHandlers(ui);
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
