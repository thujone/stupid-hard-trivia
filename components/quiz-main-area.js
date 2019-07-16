import React, { Component } from 'react'
import styled from 'styled-components'
import LevelSelector from './level-selector'
import AvatarSelector from './avatar-selector'
import FirstNameForm from './first-name-form'
import TrackerTimer from './tracker-timer'

const Main = styled.main`
  padding: 0 1em;
`

const QuestionText = styled.div`
  position: relative;
  font-size: 16px;
  width: 100%;
  max-width: 960px;
  margin: 25px auto;
  
  @media (min-width: 900px) {
    font-size: 2vw;
  }
`

const NextQuestionLink = styled.button`
  display: none;
  position: absolute;
  top: 100px;
  right: 0;
  width: 150px;
  height: 150px;
  clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
  background-color: var(--medium-green);
  cursor: pointer;
  opacity: .5;
  transition: .5s;

  &:hover {
    opacity: 1;
  }
`

const QuestionImage = styled.div`
  position: relative;
  margin: 15px auto;
  background: url();
  background-repeat: no-repeat !important;
  background-position: 0 -1.5em !important;
  background-size: cover !important;
  width: 30em;
  height: 15em;
  border: 3px solid var(--dark-gray);
  border-radius: 3px;
  transition: all .5s;
  cursor: pointer;
  z-index: 5;
`

const Answers = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  max-width: 960px;
  height: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: stretch;
  z-index: 1;
`

const Answer = styled.a`
  margin: 5px;
  height: 60px;
  flex: 0 1 auto;
  flex-direction: flex-row;
  padding: 2px;
  border: 2px solid var(--dark-gray);
  border-radius: 25px;
  display: flex;
  background-color: var(--medium-gray);
  transition: .1s all;
  cursor: pointer;

  &:hover {
    background-color: var(--light-blue);
    border-color: var(--dark-blue);
    transform: scale(1.05);

    div:nth-of-type(1) {
      background-color: var(--dark-blue);
      color: var(--light-blue);
    }

    div:nth-of-type(2) {
      color: var(--dark-blue);
    }
  }
`

const Letter = styled.div`
  font-size: 20px;
  font-family: Lalezar;
  width: 15%;
  height: 100%;
  background: var(--dark-gray);
  color: var(--light-gray);
  border-radius: 20px;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  text-align: center;
  line-height: 55px;
  transition: .4s all;
`

const Text = styled.div`
  text-align: center;
  width: 18vw;
  line-height: 1.1em;
  padding: 5px 10px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s all;
`

class QuizMainArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: props.level,
      avatar: props.avatar,
      name: props.name,
      q: props.q,
      quiz: props.quiz,
      results: props.results,
      result: null,
      question: props.question,
      questions: props.questions,
      episodes: props.episodes,
      options: props.options,
      backgroundUrl: props.backgroundUrl,
      episode: props.episode,
      correctAnswers: 0,
      score: props.score,
      stopTimer: false,
      secs: 15
    }
  }

  componentDidMount() {
    const quizArray = this.getRandomizedQuizArray()
    const quiz = this.assembleQuiz(quizArray)
    const question = quiz[this.state.q - 1]
    const options = this.shuffle([question.option1, question.option2, question.option3, question.option4, question.option5, question.answer])
    
    this.props.setStateHandler({
      backgroundUrl: `/static/screenshots/large/s${question.s}e${question.e}q${question.q}.png`,
      options,
      question,
      quiz,
      episode: this.state.episodes.find(item => item.episode === question.e)
    })
    this.setState({
      backgroundUrl: `/static/screenshots/large/s${question.s}e${question.e}q${question.q}.png`,
      options,
      question,
      quiz,
      episode: this.state.episodes.find(item => item.episode === question.e)
    })
  }

  componentDidUpdate() {
    const background = `url('${this.props.backgroundUrl}')`
    this.questionImage.style.background = background
  }

  getRandomizedQuizArray = () => {
    const randomIndexes = [];
    while (randomIndexes.length < 20) {
      const randomNumber = this.getRandomNumber(0, this.state.questions.length - 1)
      if (!randomIndexes.find(i => i === randomNumber)) {
        randomIndexes.push(randomNumber)
      }
    }
    return randomIndexes
  }

  assembleQuiz = (indexes) => {
    const quiz = indexes.map(item => this.state.questions[item])
    return quiz
  }

  getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)

  shuffle = (arr) => {
    let currentIndex = arr.length
    let temporaryValue
    let randomIndex;
  
    while (0 !== currentIndex) {  
      randomIndex = Math.floor(Math.random() * currentIndex);
      --currentIndex;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

  zoomScreenshot = () => {
    document.getElementById('screenshot').classList.add('is-zoomed')
  }

  unzoomScreenshot = () => {
    document.getElementById('screenshot').classList.remove('is-zoomed')
  }

  stopTimer = () => {

  }

  checkResponse = (response, nthOption) => {
    if (this.state.result)
      return

    const isCorrect = response !== null && response === this.state.question.answer
    const result = {
      q: this.state.q,
      qid: this.state.question.id,
      response,
      isCorrect
    }
    const results = this.state.results
    results.push(result)
    const bonusPoints = Math.ceil(parseInt(document.getElementById('seconds').innerText) * 1.67)
    this.setState({
      result: result,
      results: results,
      correctAnswers: isCorrect ? this.state.correctAnswers + 1 : this.state.correctAnswers,
      score: isCorrect ? this.state.score + 25 + bonusPoints : this.state.score,
      stopTimer: true
    })
    this.props.setStateHandler({
      result: result,
      results,
      correctAnswers: this.state.correctAnswers + 1,
      score: isCorrect ? this.state.score + 25 + bonusPoints: this.state.score
    })
    if (response === this.state.question.answer) {
      document.querySelector(`#answers a:nth-of-type(${nthOption})`).classList.add('is-correct')
    } else {
      if (nthOption != null)
        document.querySelector(`#answers a:nth-of-type(${nthOption})`).classList.add('is-incorrect')
      const options = document.querySelectorAll('#answers div:nth-of-type(2)')
      options.forEach((item, i) => {
        if (item.innerText === this.state.question.answer) {
          item.closest('a').classList.add('is-correct')
        }
      })
    }
    this.setState({ results })
    this.nextQuestionLink.style.display = 'block'
  }

  moveForward = () => {
    const q = this.state.q + 1
    const question = this.state.quiz[q - 1]
    const options = this.shuffle([question.option1, question.option2, question.option3, question.option4, question.option5, question.answer])
    const backgroundUrl = `/static/screenshots/large/s${question.s}e${question.e}q${question.q}.png`
    const oldOptions = document.querySelectorAll('.is-correct, .is-incorrect', '#answers')

    oldOptions.forEach(oldOptions => {
      if (oldOptions && oldOptions.classList) {
        oldOptions.classList.remove('is-correct')
        oldOptions.classList.remove('is-incorrect')
      }
    })

    this.nextQuestionLink.style.display = 'none'

    this.props.setStateHandler({
      q,
      question,
      options,
      backgroundUrl,
      episode: this.state.episodes.find(item => item.episode === question.e),
      result: null
    })
    this.setState({
      q,
      question,
      options,
      backgroundUrl,
      episode: this.state.episodes.find(item => item.episode === question.e),
      result: null,
      stopTimer: false
    })
  }

  smartQuote = (quote) => `\u201C${quote}\u201D`

  setStateHandler = (data) => {
    this.setState({
      data
    })
  }

  render() {
    return (
      <Main>
        <TrackerTimer
          q={this.state.q}
          results={this.state.results}
          stopTimer={this.state.stopTimer}
          setStateHandler={this.setStateHandler}
          checkResponse={this.checkResponse}
        />
        {this.state.episode && this.state.question && (
          <QuestionText>
            In {this.smartQuote(`${this.state.episode.title},`)}
            &nbsp;
            {this.state.question.text}
            <NextQuestionLink
              ref={(input) => { this.nextQuestionLink = input }}
              onClick={ (e) => this.moveForward() }
            />
          </QuestionText>
        )}

        <QuestionImage
            id='screenshot'
            ref={(input) => { this.questionImage = input }}
            onClick={ (e) => this.zoomScreenshot() }
            onMouseOut={ (e) => this.unzoomScreenshot() }
        >
        </QuestionImage>
        <Answers id="answers">
          <Answer onClick={ (e) => this.checkResponse(this.state.options[0], 1) }>
            <Letter>A</Letter>
            <Text>{this.state.options[0]}</Text>
          </Answer>
          <Answer onClick={ (e) => this.checkResponse(this.state.options[1], 2) }>
            <Letter>B</Letter>
            <Text>{this.state.options[1]}</Text>
          </Answer>
          <Answer onClick={ (e) => this.checkResponse(this.state.options[2], 3) }>
            <Letter>C</Letter>
            <Text>{this.state.options[2]}</Text>
          </Answer>
          <Answer onClick={ (e) => this.checkResponse(this.state.options[3], 4) }>
            <Letter>D</Letter>
            <Text>{this.state.options[3]}</Text>
          </Answer>
          <Answer onClick={ (e) => this.checkResponse(this.state.options[4], 5) }>
            <Letter>E</Letter>
            <Text>{this.state.options[4]}</Text>
          </Answer>
          <Answer onClick={ (e) => this.checkResponse(this.state.options[5], 6) }>
            <Letter>F</Letter>
            <Text>{this.state.options[5]}</Text>
          </Answer>
        </Answers>
      
      </Main>

    )
  }
}

export default QuizMainArea