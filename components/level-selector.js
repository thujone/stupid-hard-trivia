import styled from 'styled-components'
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
  margin-bottom: 15px;

  @media (min-width: 730px) {
    display: none;
    margin-bottom: 0;
  }
`

const SelectorHeader = styled.h1`
  float: left;
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

const EasyButton = styled(LevelButton)`
  background: var(--medium-gray);

  @media (min-width: 730px) {
    background: var(--medium-gray) url(/static/graphics/silhouette-kramer.png) 20px -10px no-repeat;
    padding-top: 195px;
  }
`

const HardButton = styled(LevelButton)`
  background: var(--medium-gray);

  @media (min-width: 730px) {
    background: var(--medium-gray) url(/static/graphics/silhouette-elaine.png) 25px 0 no-repeat;
    padding-top: 195px;
  }
`

const StupidHardButton = styled(LevelButton)`
  background: var(--medium-gray);

  @media (min-width: 730px) {
    background: var(--medium-gray) url(/static/graphics/silhouette-george.png) 15px -10px no-repeat;
    padding-top: 170px;
  }
`

const SmallMessageTable = styled.table`
  background: var(--light-blue);
  display: block;
  clear: both;

  @media (min-width: 730px) {
    display: none;
  }

  th {
    font-family: Bangers;
    color: var(--dark-blue);
    vertical-align: top;
    font-size: 16px;
    width: 80px;
    padding: 4px;
  }

  td {
    font-size: 16px;
    padding: 4px;
  }
`


class LevelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      easyButtonHidden: false,
      hardButtonHidden: false,
      stupidHardButtonHidden: false,
      level: null
    }
  }

  activateParticleButton = level => {
    // const buttons = document.getElementsByTagName('button')
    // for (const item of buttons) {
    //   item.disabled = true;
    // }
    this.setState({ [`${level}ButtonHidden`]: true })
  }

  showLevelMessage = level => {
    document.getElementById(`${level}-level-message`).style.display = 'block'
    setTimeout( () => {
      document.getElementById(`${level}-level-message`).classList.add('is-visible')
    }, 15);
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
        <IntroMessage>
          <b>Note:</b> For the best experience, we recommend using a desktop browser or tablet.
        </IntroMessage>
        <SelectorHeader>Choose a level:</SelectorHeader>
        <LevelMessageWrapper>
          <LevelMessage id="easy-level-message">
            Experiencing shrinkage? Measure the inadequacy of your knowledge from a pool of our sixty easiest questions.
          </LevelMessage>
          <LevelMessage id="hard-level-message">
            Channel your inner Frogger champion... Answer twenty random questions from over 200 Easy and Hard.
          </LevelMessage>
          <LevelMessage id="stupid-hard-level-message">
            Master of this domain? <i>Get out!</i> Try a random twenty from our entire database of 300 questions.
          </LevelMessage>
        </LevelMessageWrapper>
        
        <SmallMessageTable>
          <thead></thead>
          <tbody>
            <tr>
              <th>Easy</th>
              <td>Experiencing shrinkage? Measure the inadequacy of your knowledge from a pool of our sixty easiest questions.</td>
            </tr>
            <tr>
              <th>Hard</th>
              <td>Channel your inner Frogger champion... Answer twenty random questions from over 200 Easy and Hard.</td>
            </tr>
            <tr>
              <th>Stupid-Hard</th>
              <td>Master of this domain? <i>Get out!</i> Try a random twenty from our entire database of 300 questions.</td>
            </tr>
          </tbody>
        </SmallMessageTable>

        <LevelTypes>
          <ParticleEffectButton
              color='#d42520'
              hidden={this.state.easyButtonHidden}
              type='rectangle'
              direction='top'
              duration={700}
              onComplete={(e) => this.setLevel('easy')}
          >
            <EasyButton
              onMouseOver={(e) => this.showLevelMessage('easy')}
              onMouseOut={(e) => this.hideLevelMessage('easy')}
              onClick={(e) => this.activateParticleButton('easy')}
            >
              Easy
            </EasyButton>
          </ParticleEffectButton>
          <ParticleEffectButton
              color='#d42520'
              hidden={this.state.hardButtonHidden}
              type='rectangle'
              direction='top'
              duration={700}
              onComplete={(e) => this.setLevel('hard')}
          >
            <HardButton
              onMouseOver={(e) => this.showLevelMessage('hard')}
              onMouseOut={(e) => this.hideLevelMessage('hard')}
              onClick={(e) => this.activateParticleButton('hard')}
            >
              Hard
            </HardButton>
          </ParticleEffectButton>
          <ParticleEffectButton
              color='#d42520'
              hidden={this.state.stupidHardButtonHidden}
              type='rectangle'
              direction='top'
              duration={700}
              onComplete={(e) => this.setLevel('stupid-hard')}
          >
            <StupidHardButton
              onMouseOver={(e) => this.showLevelMessage('stupid-hard')}
              onMouseOut={(e) => this.hideLevelMessage('stupid-hard')}
              onClick={(e) => this.activateParticleButton('stupidHard')}
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
