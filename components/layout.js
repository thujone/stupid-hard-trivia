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
    "footer";
`

const Layout = props => (
  <Grid id='grid'>
    <GlobalStyle />
    <HeaderArea />
    <MainArea avatars={props.avatars} questions={props.questions} episodes={props.episodes} />
    <FooterArea touch={1} />
  </Grid>
)
 
export default Layout
