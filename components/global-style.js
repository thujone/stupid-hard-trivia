import { normalize } from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Fenice';
    src: url('FeniceStd-Oblique.eot');
    src: local('FeniceStd-Oblique'),
        url('/static/fonts/FeniceStd-Oblique.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/FeniceStd-Oblique.woff2') format('woff2'),
        url('/static/fonts/FeniceStd-Oblique.woff') format('woff'),
        url('/static/fonts/FeniceStd-Oblique.ttf') format('truetype'),
        url('/static/fonts/FeniceStd-Oblique.svg#FeniceStd-Oblique') format('svg');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Ropa';
    src: url('/static/fonts/RopaSans-Italic.eot');
    src: local('Ropa Sans Italic'), local('RopaSans-Italic'),
        url('/static/fonts/RopaSans-Italic.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/RopaSans-Italic.woff2') format('woff2'),
        url('/static/fonts/RopaSans-Italic.woff') format('woff'),
        url('/static/fonts/RopaSans-Italic.ttf') format('truetype'),
        url('/static/fonts/RopaSans-Italic.svg#RopaSans-Italic') format('svg');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Bangers';
    src: url('/static/fonts/Bangers-Regular.eot');
    src: local('Bangers Regular'), local('Bangers-Regular'),
        url('/static/fonts/Bangers-Regular.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/Bangers-Regular.woff2') format('woff2'),
        url('/static/fonts/Bangers-Regular.woff') format('woff'),
        url('/static/fonts/Bangers-Regular.ttf') format('truetype'),
        url('/static/fonts/Bangers-Regular.svg#Bangers-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Ropa';
    src: url('/static/fonts/RopaSans-Regular.eot');
    src: local('Ropa Sans Regular'), local('RopaSans-Regular'),
        url('/static/fonts/RopaSans-Regular.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/RopaSans-Regular.woff2') format('woff2'),
        url('/static/fonts/RopaSans-Regular.woff') format('woff'),
        url('/static/fonts/RopaSans-Regular.ttf') format('truetype'),
        url('/static/fonts/RopaSans-Regular.svg#RopaSans-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lalezar';
    src: url('/static/fonts/Lalezar-Regular.eot');
    src: local('Lalezar-Regular'),
        url('/static/fonts/Lalezar-Regular.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/Lalezar-Regular.woff2') format('woff2'),
        url('/static/fonts/Lalezar-Regular.woff') format('woff'),
        url('/static/fonts/Lalezar-Regular.ttf') format('truetype'),
        url('/static/fonts/Lalezar-Regular.svg#Lalezar-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Erbos';
    src: url('/static/fonts/Erbos-Draco-1st-NBP.eot');
    src: local('Erbos Draco 1st NBP Regular'), local('Erbos-Draco-1st-NBP'),
        url('/static/fonts/Erbos-Draco-1st-NBP.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/Erbos-Draco-1st-NBP.woff2') format('woff2'),
        url('/static/fonts/Erbos-Draco-1st-NBP.woff') format('woff'),
        url('/static/fonts/Erbos-Draco-1st-NBP.ttf') format('truetype'),
        url('/static/fonts/Erbos-Draco-1st-NBP.svg#Erbos-Draco-1st-NBP') format('svg');
    font-weight: normal;
    font-style: normal;
  }


  :root {
    --dark-blue: #012999;
    --medium-blue: #6189d9;
    --light-blue: #7199df;
    --light-red: #f44540;
    --light-red: #f9b0a5;
    --medium-red: #d42520;
    --dark-red: #940500;
    --bright-red: #f95e5e;
    --light-green: #bbffa6;
    --medium-green: #8be876;
    --dark-green: #489a33;
    --super-light-gray: #eee;
    --very-light-gray: #aaa;
    --light-gray: #808080;
    --medium-gray: #6c6c6c;
    --dark-gray: #1a1a1a;
    --medium-yellow: #fbd84a;
  }

  * {
    box-sizing: border-box;
   } 

  body {
    font-family: 'Ropa';
    color: black;
    background: var(--medium-blue);
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: Bangers;
    font-weight: normal;
  }

  .is-visible {
    opacity: 1 !important;
    transition: opacity .4s ease-in;
  }

  .is-zoomed {
    transform: scale(2);
  }

  .is-correct {
    border-color: var(--dark-green) !important;
    background: var(--super-light-gray) !important;

    div:nth-of-type(1) {
      background-color: var(--dark-green) !important;
      color: var(--super-light-gray) !important;
    }

    div:nth-of-type(2) {
      color: var(--dark-green) !important;
    }
  }

  .is-incorrect {
    border-color: var(--medium-red) !important;
    background: var(--super-light-gray) !important;
    
    div:nth-of-type(1) {
      background-color: var(--medium-red) !important;
      color: var(--super-light-gray) !important;
    }

    div:nth-of-type(2) {
      color: var(--medium-red) !important;
    }
  }
`

export default GlobalStyle