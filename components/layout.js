import styled from 'styled-components'
import GlobalStyle from './global-style'
import HeaderArea from '../components/header-area'
import MainArea from '../components/main-area'
import NavArea from '../components/nav-area'
import FooterArea from '../components/footer-area'
import AdArea from '../components/ad-area'

const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "header"
    "main"
    "nav"
    "footer"
    "ad";
  
  @media (min-width: 600px) {
  }
`

const Layout = props => (
  <Grid id='grid'>
    <GlobalStyle />
    <HeaderArea />
    <MainArea view='home' />
    <NavArea />
    <FooterArea />
    <AdArea />
  </Grid>
)
 
export default Layout
