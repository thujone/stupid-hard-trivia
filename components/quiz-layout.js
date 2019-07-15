import React, { Component } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import GlobalStyle from './global-style'
import QuizHeaderArea from './quiz-header-area'
import QuizScoreboardArea from './quiz-scoreboard-area'
import QuizMainArea from '../components/quiz-main-area'


const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "header"
    "main"
    "nav"
    "footer"
    "ad";
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
      episode: []

    }
  }

  componentDidUpdate() {
    console.log('QuizLayout::state', this.state)
  }

  setStateHandler = (data) => {
    this.setState(data)
  }


  render() {
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
        />
        <QuizMainArea
          questions={this.props.questions}
          question={this.props.question}
          episodes={this.props.episodes}
          episode={this.props.episode}
          level={this.props.level}
          avatar={this.props.avatar}
          name={this.props.name}
          backgroundUrl={this.state.backgroundUrl}
          setStateHandler={this.setStateHandler}
          q={this.state.q}
          results={this.state.results}
          options={this.state.options}
          quiz={this.state.quiz}
        />
      </Grid>
    )
  }
}
 
export default QuizLayout
