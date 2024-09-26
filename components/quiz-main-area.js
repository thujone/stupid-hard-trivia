import React, { Component } from 'react'
import { Beforeunload, useBeforeunload } from 'react-beforeunload'
import Sound from 'react-sound'
import styled from 'styled-components'
import Link from 'next/link'
import axios from 'axios'
import TrackerTimer from './tracker-timer'
import { toast } from 'react-toastify'
import ParticleEffectButton from 'react-particle-effect-button'

const Main = styled.main`
  grid-area: main;
  padding: 0 1em;
`

const QuestionText = styled.div`
  position: relative;
  font-size: 16px;
  width: 100%;
  max-width: 960px;
  margin: 15px auto;
  
  @media (min-width: 600px) {
    font-size: 18px;
  }

  @media (min-width: 900px) {
    font-size: 24px;
  }
`

const NextQuestionLink = styled.button`
  display: none;
  position: absolute;
  top: 80px;
  right: -10px;
  width: 50px;
  height: 50px;
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
  background-position: 0 -1em !important;
  background-size: cover !important;
  width: 15em;
  height: 7.5em;
  border: 3px solid var(--dark-gray);
  border-radius: 3px;
  transition: all .5s;
  cursor: zoom-in;
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
  height: 175px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: stretch;
  z-index: 1;

  @media (min-width: 600px) {
    height: 112px;
  }

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
  height: 100%;
  background: var(--dark-gray);
  color: var(--light-gray);
  border-radius: 24px;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  text-align: center;
  line-height: 41px;
  transition: .4s all;
  width: 15%;

  @media (min-width: 900px) {
    line-height: 55px;
  }
`

const Text = styled.div`
  text-align: center;
  line-height: 1.1em;
  padding: 5px 10px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s all;
  width: 35vw;

  @media (min-width: 600px) {
    font-size: 16px;
    width: 25vw;
  }

  @media (min-width: 900px) {
    font-size: 18px;
    width: 250px;
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
  margin-bottom: 20px;
`

const FinalRow = styled.tr`
`

const FinalValue = styled.td`
  font-size: 1.8em;
  text-align: left;
  line-height: 1em;
  margin: 0;
  padding: 3px;
`

const FinalLabel = styled(FinalValue)`
  font-family: Lalezar !important;
  font-size: 1.5em;
  line-height: 1em;

  @media (min-width: 750px) {
    font-size: 1.7em;
  }

  @media (min-width: 900px) {
    font-size: 1.9em;
  }
`

const LeaderboardContainer = styled.div`
  height: 200px;
  overflow-y: scroll;
  margin: 20px 0 0;
  
  &::-webkit-scrollbar {
    width: .25em;
  }
  
  &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--dark-blue);
    outline: 1px solid var(--dark-gray);
  }
`

const Leaderboard = styled.table`
  width: 100%;
  font-size: 14px;
`

const LeaderboardHeader = styled.th`
  font-size: 16px;
  font-weight: heavy;
  color: var(--dark-blue);
  text-decoration: underline;
  vertical-align: bottom;
`

const LeaderboardPlayerHeader = styled(LeaderboardHeader)`
  text-align: left;
`

const LeaderboardLevelHeader = styled(LeaderboardHeader)`
`

const LeaderboardDateHeader = styled(LeaderboardHeader)`
`

const LeaderboardCorrectAnswersHeader = styled(LeaderboardHeader)`
`

const LeaderboardScoreHeader = styled(LeaderboardHeader)`
`

const LeaderboardField = styled.td`
  vertical-align: bottom;
`

const LeaderboardRank = styled(LeaderboardField)`
  text-align: left;
`

const LeaderboardPlayer = styled(LeaderboardField)`
  text-align: left;
`

const TinyAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 7px;
`

const LeaderboardLevel = styled(LeaderboardField)`
`

const LeaderboardDate = styled(LeaderboardField)`
`

const LeaderboardCorrectAnswers = styled(LeaderboardField)`
`

const LeaderboardScore = styled(LeaderboardField)`
`

const Button = styled.button`
  flex: 0 1 auto;
  height: 70px;
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
  padding: 15px;

  @media (min-width: 600px) {
    border: 6px solid var(--dark-gray);
  }

  &:hover {
    border-color: var(--medium-red);
    background-color: var(--medium-yellow);
    color: var(--medium-red);
    text-shadow: 0px 1pxpa 1px var(--light-red);
    transition: all .4s;
  }
`

const MediumButton = styled.button`
  flex: 0 1 auto;
  height: 52px;
  border: 3px solid var(--dark-gray);
  border-radius: 15px;
  margin: 20px 5px 0;
  font-family: Lalezar;
  font-size: 18px;
  text-shadow: 0px 1px 1px var(--very-light-gray);
  color: var(--dark-gray);
  cursor: pointer;
  padding: 6px 0 0;
  background: var(--medium-gray); 
  padding: 15px;

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
    +{Math.ceil(parseInt(document.getElementById('seconds').innerText) * 1.25) + ''} timer bonus
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
      //q: 17,
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
      highScores: [],
      score: props.score,
      stopTimer: false,
      secs: 20,
      allDone: false,
      muteButtonHidden: false,
      restartButtonHidden: false,
      playAgainButtonHidden: false,
      chooseNewLevelButtonHidden: false,
      shareScoreButtonHidden: false,
      correctAnswers: 0,
      leaderboard: [],
      quizResultsId: null,
      areResultsPosted: false,
      easy: [],
      hard: [],
      'stupid-hard': []
    }
  }

  componentDidMount() {
    const quizArray = this.getRandomizedQuizArray()
    const quiz = this.assembleQuiz(quizArray)
    const question = quiz[this.state.q - 1]
    const options = this.shuffle([question.option1, question.option2, question.option3, question.option4, question.option5, question.answer])

    const scriptToAppend = `
      <script>
        window.fbAsyncInit = function() {
          FB.init({
            appId            : '2380773312188622',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v4.0'
          });
        };
      </script>
      <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
    `
    const script = document.createRange().createContextualFragment(scriptToAppend)
    setTimeout(() => {
      document.body.appendChild(script)
    }, 500)

    this.props.setStateHandler({
      backgroundUrl: `/static/screenshots/medium/s${question.s}e${question.e}q${question.q}.png`,
      options,
      question,
      quiz,
      episode: this.state.episodes.find(item => item.episode === question.e && item.season === question.s)
    })
    this.setState({
      backgroundUrl: `/static/screenshots/medium/s${question.s}e${question.e}q${question.q}.png`,
      options,
      question,
      quiz,
      episode: this.state.episodes.find(item => item.episode === question.e && item.season === question.s)
    })
  }

  componentDidUpdate() {
    if (this.state.q <= 20) {
      const background = `url('${this.props.backgroundUrl}')`
      this.questionImage.style.background = background
    }
  }

  getRandomizedQuizArray = () => {
    let levelNumber

    if (this.state.level === 'easy') levelNumber = 1
    else if (this.state.level === 'hard') levelNumber = 2
    else levelNumber = 3

    const randomIndexes = [];
    while (randomIndexes.length < 20) {
      const randomNumber = this.getRandomNumber(0, this.state.questions.length - 1)
      if (!randomIndexes.find(i => i === randomNumber) && this.state.questions[randomNumber].difficulty <= levelNumber) {
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
    let randomIndex
  
    while (0 !== currentIndex) {  
      randomIndex = Math.floor(Math.random() * currentIndex)
      --currentIndex
      temporaryValue = arr[currentIndex]
      arr[currentIndex] = arr[randomIndex]
      arr[randomIndex] = temporaryValue
    }
    return arr
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
    const bonusPoints = Math.ceil(parseInt(document.getElementById('seconds').innerText) * 1.25)

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
    }, 2700)

    if (document.getElementById('audio-icon'))
      document.getElementById('audio-icon').style.display = 'block'
    else if (document.getElementById('disable-audio-icon'))
      document.getElementById('disable-audio-icon').style.display = 'block'

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

  postQuizResults = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/quiz-results`, {
        name: this.state.name,
        level: this.state.level,
        avatar: this.state.avatar,
        score: this.state.score,
        correctAnswers: this.state.correctAnswers,
        incorrectAnswers: this.state.results.length - this.state.correctAnswers,
        wasCompleted: this.state.allDone,
        answers: this.state.results
      })
      this.setState({ quizResultsId: response.data._id, areResultsPosted: true })
      this.getLeaderboards()
    } catch (error) {
      console.error('error', error)
      this.setState({ areResultsPosted: true })
    }
  }

  getLeaderboards = () => {
    ['easy', 'hard', 'stupid-hard'].forEach((item, i) => {
      this.getLeaderboard(item)
    })
  }

  getLeaderboard = async (level) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/leaderboard/${level}`)
      this.setState({[level]: response.data})
    } catch (error) {
      console.error('error', error)
    }
  }

  moveForward = () => {
    const q = this.state.q + 1

    if (q > 20) {
      this.setState({ allDone: true, q: 21 })
      this.postQuizResults()
      return
    }

    const question = this.state.quiz[q - 1]
    const options = this.shuffle([question.option1, question.option2, question.option3, question.option4, question.option5, question.answer])
    const backgroundUrl = `/static/screenshots/medium/s${question.s}e${question.e}q${question.q}.png`
    const oldOptions = document.querySelectorAll('.is-correct, .is-incorrect', '#answers')

    oldOptions.forEach(oldOptions => {
      if (oldOptions && oldOptions.classList) {
        oldOptions.classList.remove('is-correct')
        oldOptions.classList.remove('is-incorrect')
      }
    })

    this.nextQuestionLink.style.display = 'none'
    if (document.getElementById('audio-icon'))
      document.getElementById('audio-icon').style.display = 'none'
    else if (document.getElementById('disable-audio-icon'))
      document.getElementById('disable-audio-icon').style.display = 'none'

    this.props.setStateHandler({
      q,
      question,
      options,
      backgroundUrl,
      episode: this.state.episodes.find(item => item.episode === question.e && item.season === question.s),
      result: null
    })
    this.setState({
      q,
      question,
      options,
      backgroundUrl,
      episode: this.state.episodes.find(item => item.episode === question.e && item.season === question.s),
      result: null,
      stopTimer: false
    })
  }

  smartQuote = (quote) => `\u201C${quote}\u201D`

  activatePlayAgainParticleButton = () => {
    this.setState({ playAgainButtonHidden: true })
  }

  activateChooseNewLevelParticleButton = () => {
    this.setState({ chooseNewLevelButtonHidden: true })
  }

  activateShareScoreParticleButton = () => {
    this.setState({ shareScoreButtonHidden: true })
  }

  activateRestartParticleButton = () => {
    this.setState({ restartButtonHidden: true })
  }

  activateMuteParticleButton = () => {
    this.setState({ muteButtonHidden: true })
  }

  openShareScoreDialog = () => {
    FB.ui({
      method: 'share',
      href: 'https://seinfeldtrivia.com',
      quote: `I just scored ${this.state.score} out of 1000 playing The Stupid-Hard Seinfeld Trivia Challenge! Free to play! Over 300 questions in all!`,
      redirect_uri: 'https://seinfeldtrivia.com',
      title: 'The Stupid-Hard Seinfeld Trivia Challenge at https://seinfeldtrivia.com'
    }, function(response){
      console.log(response)
    })
  }


  printFinalMessage = (score) => {
    if (score < 100) {
      return 'Terrible job, shmoopy! I know, shmoopy!'
    } else if (score < 200) {
      return 'Adios, muchacho!'
    } else if (score < 300) {
      return 'Give yourself a schtickle of flouoride!'
    } else if (score < 400) {
      return 'Your shirt needs more puff.'
    } else if (score < 500) {
      return 'You deserve a Junior Mint!'
    } else if (score < 600) {
      return 'Great job, shmoopy! I know, shmoopy!' 
    } else if (score < 700) {
      return 'You just earned yourself a big salad!'
    } else if (score < 800) {
      return 'As beautiful as an unadorned Festivus pole!'
    } else if (score < 900) {
      return "You could be the new CEO of Kramerica Industries!"
    } else {
      return 'Amazing job! Yada yada yada.'
    }
  }

  formatIsoDate = (isoDate) => {
    const date = new Date(isoDate)
    const formattedHours = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`
    const formattedMinutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${formattedHours}:${formattedMinutes}`
  }

  setStateHandler = (data) => {
    this.setState({
      data
    })
  }

  render() {
    return (
      <Beforeunload onBeforeunload={() => { if (!this.state.areResultsPosted) {this.postQuizResults()}}}>
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
              {this.props.isAudioEnabled && this.state.stopTimer && this.state.q <= 20 &&
                <Sound
                  url={`../static/audio/seinfeld-${Math.ceil(Math.random() * 8)}.mp3`}
                  playStatus={Sound.status.PLAYING}
                  playFromPosition={0}
                />
              }
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
              {this.props.isAudioEnabled &&
                <Sound
                  url={`../static/audio/seinfeld-full.mp3`}
                  playStatus={Sound.status.PLAYING}
                  playFromPosition={0}
                />
              }
              <FinalTable>
                <tbody>
                  <FinalRow>
                    <FinalLabel>Final Score:</FinalLabel>
                    <FinalValue>{this.state.score}<sub>/1000</sub></FinalValue>
                  </FinalRow>
                  <FinalRow>
                    <FinalLabel>Correct Answers:</FinalLabel>
                    <FinalValue>{this.state.correctAnswers}<sub>/20</sub></FinalValue>
                  </FinalRow>
                </tbody>
              </FinalTable>

              <div>
                <ParticleEffectButton
                  color='#fbd84a'
                  hidden={this.state.playAgainButtonHidden}
                  type='rectangle'
                  direction='top'
                  duration={700}
                >
                  <MediumButton onClick={(e) => {
                    this.activatePlayAgainParticleButton()
                    location.reload()
                  }}>
                    Play Again
                  </MediumButton>
                </ParticleEffectButton>

                <ParticleEffectButton
                  color='#fbd84a'
                  hidden={this.state.chooseNewLevelButtonHidden}
                  type='rectangle'
                  direction='top'
                  duration={700}
                >
                  <Link href={{ pathname: '/' }}>
                    <MediumButton onClick={(e) => this.activateChooseNewLevelParticleButton()}>
                      Choose New Level
                    </MediumButton>
                  </Link>
                </ParticleEffectButton>


                <ParticleEffectButton
                  color='#fbd84a'
                  hidden={this.state.shareScoreButtonHidden}
                  type='rectangle'
                  direction='top'
                  duration={700}
                >
                  <MediumButton onClick={(e) => {
                    this.activateShareScoreParticleButton()
                    this.openShareScoreDialog()
                  }}>
                    Share Score on Facebook
                  </MediumButton>
                </ParticleEffectButton>
                
              </div>

              <h3>Stupid-Hard Leaderboard (Top 250)</h3>
              {this.state['stupid-hard'] && this.state['stupid-hard'].length > 0 &&
                <LeaderboardContainer>
                  <Leaderboard>
                    <thead>
                      <tr>
                        <td></td>
                        <LeaderboardPlayerHeader>Player</LeaderboardPlayerHeader>
                        <LeaderboardLevelHeader>Level</LeaderboardLevelHeader>
                        <LeaderboardDateHeader>Date</LeaderboardDateHeader>
                        <LeaderboardCorrectAnswersHeader># Correct</LeaderboardCorrectAnswersHeader>
                        <LeaderboardScoreHeader>Score</LeaderboardScoreHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state['stupid-hard'].map((highScore, i) => (
                        <tr key={i} className={this.state.quizResultsId === highScore._id ? 'highlight' : ''}>
                          <LeaderboardRank>{i + 1}</LeaderboardRank>
                          <LeaderboardPlayer>
                            <TinyAvatar
                              src={`/static/avatars/medium/${highScore.avatar}.jpg`}
                              alt={`${highScore.name}`}
                            />
                            {highScore.name}
                          </LeaderboardPlayer>
                          <LeaderboardLevel>{highScore.level}</LeaderboardLevel>
                          <LeaderboardDate>{this.formatIsoDate(highScore.createdAt)}</LeaderboardDate>
                          <LeaderboardCorrectAnswers>{highScore.correctAnswers}</LeaderboardCorrectAnswers>
                          <LeaderboardScore>{highScore.score}</LeaderboardScore>
                        </tr>
                      ))}
                    </tbody>
                  </Leaderboard>
                </LeaderboardContainer>
              }

              <h3>Hard Leaderboard (Top 250)</h3>
              {this.state['hard'] && this.state['hard'].length > 0 &&
                <LeaderboardContainer>
                  <Leaderboard>
                    <thead>
                      <tr>
                        <td></td>
                        <LeaderboardPlayerHeader>Player</LeaderboardPlayerHeader>
                        <LeaderboardLevelHeader>Level</LeaderboardLevelHeader>
                        <LeaderboardDateHeader>Date</LeaderboardDateHeader>
                        <LeaderboardCorrectAnswersHeader># Correct</LeaderboardCorrectAnswersHeader>
                        <LeaderboardScoreHeader>Score</LeaderboardScoreHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state['hard'].map((highScore, i) => (
                        <tr key={i} className={this.state.quizResultsId === highScore._id ? 'highlight' : ''}>
                          <LeaderboardRank>{i + 1}</LeaderboardRank>
                          <LeaderboardPlayer>
                            <TinyAvatar
                              src={`/static/avatars/medium/${highScore.avatar}.jpg`}
                              alt={`${highScore.name}`}
                            />
                            {highScore.name}
                          </LeaderboardPlayer>
                          <LeaderboardLevel>{highScore.level}</LeaderboardLevel>
                          <LeaderboardDate>{this.formatIsoDate(highScore.createdAt)}</LeaderboardDate>
                          <LeaderboardCorrectAnswers>{highScore.correctAnswers}</LeaderboardCorrectAnswers>
                          <LeaderboardScore>{highScore.score}</LeaderboardScore>
                        </tr>
                      ))}
                    </tbody>
                  </Leaderboard>
                </LeaderboardContainer>
              }

              <h3>Easy Leaderboard (Top 250)</h3>
              {this.state['easy'] && this.state['easy'].length > 0 &&
                <LeaderboardContainer>
                  <Leaderboard>
                    <thead>
                      <tr>
                        <td></td>
                        <LeaderboardPlayerHeader>Player</LeaderboardPlayerHeader>
                        <LeaderboardLevelHeader>Level</LeaderboardLevelHeader>
                        <LeaderboardDateHeader>Date</LeaderboardDateHeader>
                        <LeaderboardCorrectAnswersHeader># Correct</LeaderboardCorrectAnswersHeader>
                        <LeaderboardScoreHeader>Score</LeaderboardScoreHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state['easy'].map((highScore, i) => (
                        <tr key={i} className={this.state.quizResultsId === highScore._id ? 'highlight' : ''}>
                          <LeaderboardRank>{i + 1}</LeaderboardRank>
                          <LeaderboardPlayer>
                            <TinyAvatar
                              src={`/static/avatars/medium/${highScore.avatar}.jpg`}
                              alt={`${highScore.name}`}
                            />
                            {highScore.name}
                          </LeaderboardPlayer>
                          <LeaderboardLevel>{highScore.level}</LeaderboardLevel>
                          <LeaderboardDate>{this.formatIsoDate(highScore.createdAt)}</LeaderboardDate>
                          <LeaderboardCorrectAnswers>{highScore.correctAnswers}</LeaderboardCorrectAnswers>
                          <LeaderboardScore>{highScore.score}</LeaderboardScore>
                        </tr>
                      ))}
                    </tbody>
                  </Leaderboard>
                </LeaderboardContainer>
              }
            </FinalResults>
          }
        </Main>
      </Beforeunload>
    )
  }
}

export default QuizMainArea
