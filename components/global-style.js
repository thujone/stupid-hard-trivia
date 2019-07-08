import { normalize } from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
   box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    @import url('https://fonts.googleapis.com/css?family=Montserrat:regular,bold,italic');
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //max-height: inherit;
  }

  h1 {
    font-size: 64px;
    font-weight: normal;
  }

  h2 {
    font-weight: normal;
  }

  button {
    outline: none;
    font-family: Montserrat, sans-serif;
  }
  
  .aside-menu {
    width: 100%;
    padding: 20px;
  }
`

export default GlobalStyle