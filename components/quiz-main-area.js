import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import TrackerTimer from './tracker-timer'
import { toast } from 'react-toastify'
import ParticleEffectButton from 'react-particle-effect-button'

const Main = styled.main`
  padding: 0 1em;
`

const QuestionText = styled.div`
  position: relative;
  font-size: 18px;
  width: 100%;
  max-width: 960px;
  margin: 15px auto;
  
  @media (min-width: 900px) {
    font-size: 24px;
  }
`

const NextQuestionLink = styled.button`
  display: none;
  position: absolute;
  top: 83px;
  right: 0;
  width: 75px;
  height: 75px;
  clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
  background-color: var(--medium-green);
  cursor: pointer;
  opacity: .8;
  transition: all .25s;
  border: none;

  &:hover {
    opacity: 1;
    transform: scale(1.15);
  }

  @media (min-width: 600px) {
    width: 90px;
    height: 90px;
    top: 93px;
  }


  @media (min-width: 900px) {
    width: 150px;
    height: 150px;
    top: 92px;
  }
`

const QuestionImage = styled.div`
  position: relative;
  margin: 15px auto;
  background: url();
  background-repeat: no-repeat !important;
  background-position: 0 -1.5em !important;
  background-size: cover !important;
  width: 20em;
  height: 10em;
  border: 3px solid var(--dark-gray);
  border-radius: 3px;
  transition: all .5s;
  cursor: pointer;
  z-index: 5;

  @media (min-width: 600px) {
    width: 25em;
    height: 12.5em;
  }

  @media (min-width: 900px) {
    width: 30em;
    height: 15em;
  }
`

const Answers = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  max-width: 960px;
  height: 112px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: stretch;
  z-index: 1;

  @media (min-width: 900px) {
    height: 150px;
  }
`

const Answer = styled.a`
  margin: 5px;
  height: 45px;
  flex: 0 1 auto;
  flex-direction: flex-row;
  padding: 2px;
  border: 2px solid var(--dark-gray);
  border-radius: 14px;
  display: flex;
  background-color: var(--medium-gray);
  transition: .1s all;
  cursor: pointer;

  @media (min-width: 750px) {
    border-radius: 25px;
  }

  @media (min-width: 900px) {
    height: 60px;
  }


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
  border-radius: 24px;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  text-align: center;
  line-height: 41px;
  transition: .4s all;

  @media (min-width: 900px) {
    line-height: 55px;
  }
`

const Text = styled.div`
  text-align: center;
  width: 24vw;
  max-width: 215px;
  line-height: 1.1em;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s all;

  @media (min-width: 600px) {
    font-size: 16px;
  }

  @media (min-width: 900px) {
    font-size: 18px;
  }
`

const FinalResults = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 2em auto;
  border-radius: 1.3em;
  background: #7199df;
  padding: 1.1em 1.3em;
  min-height: 300px;
  text-align: center;

  @media (min-width: 600px) {
    min-height: 300px;
    width: 70%;
  }

  h2 {
    font-family: Bangers;
    color: var(--dark-blue);
    font-size: 1.6em;
    text-align: left;
    margin-top: 0;
    line-height: 1em;

    @media (min-width: 900px) {
      font-size: 2em;
    }
  }
`
const FinalTable = styled.table`
  width: 65%;
`

const FinalRow = styled.tr`
`

const FinalValue = styled.td`
  font-size: 1.8em;
  text-align: left;
  line-height: 1.8em;
  margin: 0;
  padding: 3px;
`

const FinalLabel = styled(FinalValue)`
  font-family: Lalezar !important;
  font-size: 1.5em;

  @media (min-width: 750px) {
    font-size: 1.7em;
  }

  @media (min-width: 900px) {
    font-size: 1.9em;
  }
`

const Button = styled.button`
  flex: 0 1 auto;
  height: 70px;
  width: 250px;
  border: 3px solid var(--dark-gray);
  border-radius: 15px;
  margin-top: 20px;
  font-family: Lalezar;
  font-size: 2em;
  text-shadow: 0px 1px 1px var(--very-light-gray);
  color: var(--dark-gray);
  cursor: pointer;
  padding: 6px 0 0;
  background: var(--medium-gray);

  @media (min-width: 600px) {
    border: 6px solid var(--dark-gray);
  }

  &:hover {
    border-color: var(--medium-red);
    background-color: var(--medium-yellow);
    color: var(--medium-red);
    text-shadow: 0px 1px 1px var(--light-red);
    transition: all .4s;
  }
`

const CorrectToast = ({ CorrectToast }) => (
  <div>
    <h1>Correct!</h1>
    +25 points
    <br />
    +{Math.ceil(parseInt(document.getElementById('seconds').innerText) * 1.67) + ''} timer bonus
    <br />
    <br />
  </div>
)

const IncorrectToast = ({ IncorrectToast }) => (
  <div>
    <h1>Wrong!</h1>
    No points for you!
    <br />
    <br />
  </div>
)

class QuizMainArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: props.level,
      avatar: props.avatar,
      name: props.name,
      q: props.q,
      //q: 20,
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
      secs: 15,
      allDone: false,
      buttonHidden: false,
      correctAnswers: 0
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
    if (this.state.q <= 20) {
      const background = `url('${this.props.backgroundUrl}')`
      this.questionImage.style.background = background
    }
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

    if (isCorrect) {
      toast.success(<CorrectToast />)
    } else {
      toast.error(<IncorrectToast />)
    }

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

    setTimeout(() => {
      this.nextQuestionLink.style.display = 'block'
    }, 2700);

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
  }

  moveForward = () => {
    const q = this.state.q + 1

    if (q > 20) {
      this.setState({ allDone: true, q: 21 })
      return
    }

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

  activateParticleButton = () => {
    this.setState({ buttonHidden: true })
  }

  printFinalMessage = (score) => {
    if (score < 100) {
      return 'Terrible job, shmoopy! I know, shmoopy!'
    } else if (score < 200) {
      return 'Terrible job, shmoopy! I know, shmoopy!'
    } else if (score < 300) {
      return 'You need a schtickle of flouoride!'
    } else if (score < 400) {
      return 'Your shirt needs more puff.'
    } else if (score < 500) {
      return 'Not bad! You deserve a Junior Mint!'
    } else if (score < 600) {
      return 'Great job, shmoopy! I know, shmoopy!'
    } else if (score < 700) {
      return 'You just earned yourself a big salad!'
    } else if (score < 800) {
      return 'Beautiful as an unadorned Festivus pole!'
    } else if (score < 900) {
      return 'You should be CEO of Kramerica Industries!'
    } else {
      return 'Amazing job! Yada yada yada.'
    }
  }

  setStateHandler = (data) => {
    this.setState({
      data
    })
  }

  render() {
    console.log('state', this.state)
    return (
      <Main>
        <TrackerTimer
          q={this.state.q}
          results={this.state.results}
          stopTimer={this.state.stopTimer}
          setStateHandler={this.setStateHandler}
          checkResponse={this.checkResponse}
          allDone={this.state.allDone}
        />

        {this.state.episode && this.state.question && this.state.q <= 20 && (
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

        {this.state.q <= 20 &&
          <div>
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
          </div>
        }

        {this.state.allDone &&
          <FinalResults>
            <h2>{this.printFinalMessage(this.state.score)}</h2>
            <FinalTable>
              <FinalRow>
                <FinalLabel>Final Score:</FinalLabel>
                <FinalValue>{this.state.score}</FinalValue>
              </FinalRow>
              <FinalRow>
                <FinalLabel>Correct Answers:</FinalLabel>
                <FinalValue>{this.state.correctAnswers}/20</FinalValue>
              </FinalRow>
            </FinalTable>
            <div>
              <ParticleEffectButton
                color='#fbd84a'
                hidden={this.state.buttonHidden}
                type='rectangle'
                direction='top'
                duration={700}
              >
                <Link
                  href={{
                    pathname: '/index'
                  }}
                >
                <Button onClick={(e) => this.activateParticleButton()}>
                  Play Again
                </Button>
              </Link>
            </ParticleEffectButton>
            </div>
          </FinalResults>
        }
      
      </Main>

    )
  }
}

export default QuizMainArea