import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';
import GlobalStyle from '../src/styles/globalStyle';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { addDecorator } from '@storybook/react';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export const globalTypes = {
  initialEntries: {
    Issues: '/issues',
    IssueDetail: '/issues/1',
    Labels: '/labels',
    Milestones: '/milestones',
  },
};

export const decorators = [
  (Story, context) => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.append(modalRoot);

    return (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<LoadingSpinner size={80} />}>
              <GlobalStyle />
              <MemoryRouter initialEntries={[globalTypes.initialEntries[context.component.name]]}>
                <div id="root">
                  <Story />
                </div>
              </MemoryRouter>
            </Suspense>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );
  },
];

initialize();
addDecorator(mswDecorator);
