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
    font-family: 'Ropa Sans';
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
    font-family: 'Ropa Sans';
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

  * {
    box-sizing: border-box;
   } 

  body {
    font-family: 'Ropa Sans';
    color: black;
    background: #6189d9;
  }

  h1 {
    font-family: Bangers;
    font-weight: normal;
    font-size: 4em;
  }

  h2 {
    font-family: Bangers;
    font-weight: normal;
    font-size: 3em;
  }

  .content {
    max-width: 980px;
    margin: auto;
    border: 1px dotted black;
  }
`

export default GlobalStyle