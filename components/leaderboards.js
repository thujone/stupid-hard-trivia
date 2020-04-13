import styled from 'styled-components'
import axios from 'axios'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'

const SelectorWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border: .5em double var(--dark-blue);
  border-radius: 1.3em;
  background: #7199df;
  padding: 1.1em 1.3em;
  height: 1320px;

  @media (min-width: 730px) {
    border: 1em double var(--dark-blue);
  }

  h1 {
    font-family: Bangers;
    color: var(--dark-blue);
    text-align: left;
    margin-top: 0;
    line-height: 1em;
  }
`

const IntroMessage = styled.div`
  display: block;
`

const SelectorHeader = styled.h1`
  display: block;
  height: 50px;
  width: 200px;
  margin: .2em 0;
`

const LevelMessageWrapper = styled.div`
  float: right;
  height: 90px;
  width: 55%;
  max-width: 580px;
  margin-right: 5%;
  display: none;

  @media (min-width: 730px) {
    display: block;
  }

  @media (min-width: 900px) {
    height: 90px;
    width: 67%;
  }
`

const LevelMessage = styled.div`
  font-size: 1.2em;
  text-align: center;
  line-height: 1.1em;
  padding-top: 12px;
  display: none;
  opacity: 0;
  height: auto;
  max-width: 580px;
  margin: auto;

  @media (min-width: 900px) {
    font-size: 1.5em;
  }
`

const LevelTypes = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-direction: row;
`

const LevelButton = styled.button`
  line-height: .8em;
  height: 50px;
  width: auto;
  border: 3px solid var(--dark-gray);
  border-radius: 10px;
  font-family: Lalezar;
  font-size: 1em;
  text-shadow: 0px 1px 1px var(--very-light-gray);
  color: var(--dark-gray);
  cursor: pointer;
  margin: 15px 5px 5px;
  padding: 5px 10px;
  transition: all .5s;

  @media (min-width: 730px) {
    border: 6px solid #1a1a1a;
    height: 235px;
    width: 202px;
    padding: 25px;
    font-size: 2em;
  }

  &:hover {
    border-color: var(--medium-red);
    background-color: var(--medium-yellow);
    color: var(--medium-red);
    text-shadow: 0px 1px 1px var(--light-red);
  }
`


const LeaderboardContainer = styled.div`
  height: 300px;
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

const ActionButtonRow = styled.div`
  text-align: center;
  margin-top: 20px;
`

const ActionButton = styled.button`
  flex: 0 1 auto;
  height: 52px;
  border: 3px solid var(--dark-gray);
  border-radius: 10px;
  margin: 0 5px 10px;
  font-family: Lalezar;
  font-size: 18px;
  text-shadow: 0px 1px 1px var(--very-light-gray);
  color: var(--dark-gray);
  cursor: pointer;
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


class Leaderboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      easy: [],
      hard: [],
      'stupid-hard': []
    }
  }

  componentDidMount() {
    this.getLeaderboards()
  }

  getLeaderboards = () => {
    ['easy', 'hard', 'stupid-hard'].forEach((item, i) => {
      const leaderboard = this.getLeaderboard(item)
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

  formatIsoDate = (isoDate) => {
    const date = new Date(isoDate)
    const formattedHours = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`
    const formattedMinutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${formattedHours}:${formattedMinutes}`
  }

  render() {
    return (
      <SelectorWrapper>
        <SelectorHeader>Leaderboards</SelectorHeader>
        <IntroMessage>
          <strong>Note: </strong>
          Due to high volume, leaderboard scores may be reset or deleted at any time.
        </IntroMessage>


        <h2>Stupid-Hard Leaderboard (Top 250)</h2>
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

        <h2>Hard Leaderboard (Top 250)</h2>
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

        <h2>Easy Leaderboard (Top 250)</h2>
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

        <ActionButtonRow>
          <ActionButton onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
            this.props.setStateHandler({view: 'home'})
          }}>
            Let's Play!
          </ActionButton>
        </ActionButtonRow>


      </SelectorWrapper>
    )
  }
}

export default Leaderboards
