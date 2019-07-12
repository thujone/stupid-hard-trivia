import { useRouter } from 'next/router'
import styled from 'styled-components'
import GlobalStyle from './global-style'
import QuizHeaderArea from './quiz-header-area'
import QuizScoreboardArea from './quiz-scoreboard-area'
import QuizMainArea from '../components/quiz-main-area'


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

const QuizLayout = props => {
  const router = useRouter()
  return (
    <Grid id='grid'>
      <GlobalStyle />
      <QuizHeaderArea />
      <QuizScoreboardArea
        questions={props.questions}
        episodes={props.episodes}
        level={router.query.level}
        avatar={router.query.avatar}
        q={router.query.q}
        name={router.query.name}
      />
      <QuizMainArea
        questions={props.questions}
        episodes={props.episodes}
        level={router.query.level}
        avatar={router.query.avatar}
        q={router.query.q}
        name={router.query.name}
      />
    </Grid>
  )
}
 
export default QuizLayout
