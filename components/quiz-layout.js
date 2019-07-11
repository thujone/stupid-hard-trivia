import styled from 'styled-components'
import GlobalStyle from './global-style'

const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "header"
    "main"
    "nav"
    "footer"
    "ad";
`

const QuizLayout = props => (
  <Grid id='grid'>
    <GlobalStyle />
    <QuizMainArea avatars={props.avatars} questions={props.questions} episodes={props.episodes} />
  </Grid>
)
 
export default QuizLayout
