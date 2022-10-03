import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/globalStyle';
import theme from '@/styles/theme';
import axios from 'axios';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_URL;

const App = () => (
  <ErrorBoundary fallback={<div>Error</div>}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingSpinner size={80} />}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyle />
            <Routers />
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </ErrorBoundary>
);

export default App;
