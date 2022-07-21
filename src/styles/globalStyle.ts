import { createGlobalStyle } from 'styled-components';
import reset from '@/styles/reset';

const GlobalStyle = createGlobalStyle`
${reset}; 

html {
  font-size: 62.5%; 
}


* {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;    
  }

  body {
    background: #F7F7FC;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
