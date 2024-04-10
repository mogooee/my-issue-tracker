import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from '@/router';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/globalStyle';
import theme from '@/styles/theme';
import axios from 'axios';

import ErrorBoundary from '@/components/ErrorBoundary';
import ServiceLoading from '@/components/Modal/ServiceLoading';
import GlobalErrorUI from './components/ErrorBoundary/GlobalErrorUI';
import '@/styles/globalFont.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      retry: 0,
      useErrorBoundary: true,
    },
    mutations: {
      retry: 0,
      useErrorBoundary: true,
    },
  },
});

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_URL;

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <GlobalStyle />
          <ErrorBoundary resetKeys={['global']} fallbackRender={GlobalErrorUI}>
            <Suspense fallback={<ServiceLoading />}>
              <Routers />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
