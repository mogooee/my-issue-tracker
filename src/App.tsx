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

import CustomErrorBoundary from '@/components/ErrorBoundary';
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
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <CustomErrorBoundary>
            <Suspense fallback={<LoadingSpinner size={80} />}>
              <ReactQueryDevtools initialIsOpen={false} />
              <GlobalStyle />
              <Routers />
            </Suspense>
          </CustomErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
