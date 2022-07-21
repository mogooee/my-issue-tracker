import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/globalStyle';
import theme from '@/styles/theme';

import Routers from '@/router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routers />
    </ThemeProvider>
  );
};

export default App;
