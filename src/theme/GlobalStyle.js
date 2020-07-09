import { createGlobalStyle } from 'styled-components';
import { device } from '../mediaQueries/mediaQueries';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;700;900&display=swap');

  *,*::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;

    @media ${device.tablet} {
      font-size: 80%;
    }

    @media ${device.tablet} {
      font-size: 95%;
    }
  }

  body {
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
    background: hsl(240, 1%, 26%);
    color: hsl(222, 17%, 89%);
  }

  @keyframes slideIn {
    0% {transform: translateX(-20px); opacity:0}
    100% {transform: translateX(0); opacity: 1}
  }
`;

export default GlobalStyle;