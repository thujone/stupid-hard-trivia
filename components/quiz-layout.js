import React, { Component } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import GlobalStyle from './global-style'
import { ToastContainer, toast } from 'react-toastify'
import QuizHeaderArea from './quiz-header-area'
import QuizScoreboardArea from './quiz-scoreboard-area'
import QuizMainArea from '../components/quiz-main-area'
import QuizFooterArea from '../components/quiz-footer-area'
import AdArea from '../components/ad-area'


const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "header"
    "scoreboard"
    "main"
    "quiz-footer";
`

class QuizLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundUrl: '/static/screenshots/large/s2e1q1.png',
      q: 1,
      results: [],
      options: [],
      quiz: [],
      question: [],
      episodes: [],
      episode: {},
      score: 0
    }
  }

  componentDidUpdate() {
    // console.log('QuizLayout::state', this.state)
  }

  setStateHandler = (data) => {
    this.setState(data)
  }


  render() {
    console.log('QuizLayout::state', this.state)
    return (
      <Grid id='grid'>
        <GlobalStyle />
        <QuizHeaderArea />
        <QuizScoreboardArea
          questions={this.props.questions}
          episodes={this.props.episodes}
          level={this.props.level}
          avatar={this.props.avatar}
          name={this.props.name}
          q={this.state.q}
          results={this.state.results}
          score={this.state.score}
        />
        <QuizMainArea
          questions={this.props.questions}
          question={this.props.question}
          episodes={this.props.episodes}
          level={this.props.level}
          avatar={this.props.avatar}
          name={this.props.name}
          backgroundUrl={this.state.backgroundUrl}
          setStateHandler={this.setStateHandler}
          q={this.state.q}
          results={this.state.results}
          options={this.state.options}
          quiz={this.state.quiz}
          score={this.state.score}
          episode={this.state.episode}
        />
        <QuizFooterArea touch={true} q={this.state.q} />
        <ToastContainer 
          position="top-center"
          autoClose={1900}
          newestOnTop={false}
          rtl={false}
          hideProgressBar
        />
      </Grid>
    )
  }
}
 
export default QuizLayout
