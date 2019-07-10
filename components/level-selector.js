import styled from 'styled-components'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'

const SelectorWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border: .67em double #012999;
  border-radius: 1.3em;
  background: #7199df;
  padding: 1.1em 1.3em;
  min-height: 300px;

  @media (min-width: 600px) {
    border: 1em double #012999;
    min-height: 300px;
  }

  h1 {
    font-family: Bangers;
    color: #012999;
    text-align: left;
    margin-top: 0;
    line-height: 1em;
  }
`

const SelectorHeader = styled.h1`
  float: left;
  display: block;
  height: 50px;
  width: 200px;
`

const LevelMessageWrapper = styled.div`
  float: right;
  height: 90px;
  width: 55%;
  max-width: 580px;
  margin-right: 5%;

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
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const LevelButton = styled.button`
  flex: 0 1 33%;
  line-height: .8em;
  height: 235px;
  width: 202px;
  border: 3px solid #1a1a1a;
  border-radius: 10px;
  font-family: Lalezar;
  font-size: 2em;
  text-shadow: 0px 1px 1px #666;
  color: #1a1a1a;
  cursor: pointer;
  margin: 5px;
  padding: 25px;

  @media (min-width: 600px) {
    border: 6px solid #1a1a1a;
  }

  &:hover {
    border-color: #e43530;
    background-color: #fbd84a;
    color: #e43530;
    text-shadow: 0px 1px 1px #f95045;
    transition: background-color .6s;
    transition: border-color .6s;
    transition: color .6s;
  }
`

const StupidButton = styled(LevelButton)`
  background: #777 url(/static/graphics/silhouette-kramer.png) 20px -10px no-repeat;
  padding-top: 195px;
`

const HardButton = styled(LevelButton)`
  background: #777 url(/static/graphics/silhouette-elaine.png) 25px 0 no-repeat;
  padding-top: 195px;
`

const StupidHardButton = styled(LevelButton)`
  background: #777 url(/static/graphics/silhouette-george.png) 15px -10px no-repeat;
  padding-top: 170px;
`


class LevelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stupidButtonHidden: false,
      hardButtonHidden: false,
      stupidHardButtonHidden: false,
      level: null
    }
  }

  showLevelMessage = level => {
    document.getElementById(`${level}-level-message`).style.display = 'block'
    setTimeout( () => {
      document.getElementById(`${level}-level-message`).classList.add('is-visible')
    }, 1);
  }

  hideLevelMessage = level => {
    document.getElementById(`${level}-level-message`).style.display = 'none'
    document.getElementById(`${level}-level-message`).classList.remove('is-visible')
  }

  setLevel = level => {
    this.setState({
      level: level
    })
    this.props.setStateHandler({
      level: level,
      view: 'avatar'
    })
  }

  render() {
    return (
      <SelectorWrapper>
        <SelectorHeader>Choose a level:</SelectorHeader>
        <LevelMessageWrapper>
          <LevelMessage id="stupid-level-message">
            Experiencing shrinkage? Measure the adequacy of your knowledge with twenty of our easiest questions.
          </LevelMessage>
          <LevelMessage id="hard-level-message">
            Channel your inner Frogger champion by answering twenty random questions from our extensive database.
          </LevelMessage>
          <LevelMessage id="stupid-hard-level-message">
            Are you the master of this domain? Try twenty sets of twenty questions... 400 questions in all!
          </LevelMessage>
        </LevelMessageWrapper>   
        <LevelTypes>
          <ParticleEffectButton
              color='#fbd84a'
              hidden={this.state.stupidButtonHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setLevel('stupid')}
          >
            <StupidButton
              onMouseOver={(e) => this.showLevelMessage('stupid')}
              onMouseOut={(e) => this.hideLevelMessage('stupid')}
              onClick={() => this.setState({stupidButtonHidden: true})}
            >
              Easy
            </StupidButton>
          </ParticleEffectButton>
          <ParticleEffectButton
              color='#fbd84a'
              hidden={this.state.hardButtonHidden}
              type='triangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setLevel('hard')}
          >
            <HardButton
              onMouseOver={(e) => this.showLevelMessage('hard')}
              onMouseOut={(e) => this.hideLevelMessage('hard')}
              onClick={() => this.setState({hardButtonHidden: true})}
            >
              Hard
            </HardButton>
          </ParticleEffectButton>
          <ParticleEffectButton
              color='#fbd84a'
              hidden={this.state.stupidHardButtonHidden}
              type='triangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setLevel('stupid-hard')}
          >
            <StupidHardButton
              onMouseOver={(e) => this.showLevelMessage('stupid-hard')}
              onMouseOut={(e) => this.hideLevelMessage('stupid-hard')}
              onClick={() => this.setState({stupidHardButtonHidden: true})}
            >
              Stupid-Hard
            </StupidHardButton>
          </ParticleEffectButton>
        </LevelTypes>
      </SelectorWrapper>
    )
  }
}

export default LevelSelector
