import Link from 'next/link'
import styled from 'styled-components'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'

const Main = styled.main`
  grid-area: main;
`

const LevelSelector = styled.section`
  width: 100%;
  max-width: 960px;
  margin: auto;
  padding: 0 20px;

  h1 {
    font-family: Lalezar;
    text-shadow: #ddd 1px 1px 0;
  }
`

const LevelTypes = styled.div`
  display: flex;
`

const LevelButton = styled.button`
  flex: 0 1 auto;
  height: 60px;
  background: #33b;
  border: 10px dotted #99e;
  font-size: 2em;
  cursor: pointer;
  margin: 5px;
`

const StupidButton = styled(LevelButton)`
  background: periwinkle;
`
const HardButton = styled(LevelButton)`
  background: salmon;
`
const StupidHardButton = styled(LevelButton)`
  background: hotpink;
`

class MainArea extends Component {

  state = {
    stupidButtonHidden: false,
    hardButtonHidden: false,
    stupidHardButtonHidden: false
  }

  render() {
    return (
      <Main role='main'>

        {this.props.view === 'home' &&
          <LevelSelector role='contentinfo'>
            <h1>Choose a level:</h1>

            <LevelTypes>
              <ParticleEffectButton
                  color='#33b'
                  hidden={this.state.stupidButtonHidden}
                  type='triangle'
                  direction='top'
                  duration={2000}
              >
                <StupidButton onClick={() => this.setState({stupidButtonHidden: true})}>Easy</StupidButton>
              </ParticleEffectButton>

              <ParticleEffectButton
                  color='#33b'
                  hidden={this.state.hardButtonHidden}
                  type='triangle'
                  direction='top'
                  duration={2000}
              >
                <HardButton onClick={() => this.setState({hardButtonHidden: true})}>Hard</HardButton>
              </ParticleEffectButton>

              <ParticleEffectButton
                  color='#33b'
                  hidden={this.state.stupidHardButtonHidden}
                  type='triangle'
                  direction='top'
                  duration={2000}
              >
                <StupidHardButton onClick={() => this.setState({stupidHardButtonHidden: true})}>Stupid-Hard</StupidHardButton>
              </ParticleEffectButton>
            </LevelTypes>
          </LevelSelector>
        }
        <img src='/static/graphics/group-cab.png' alt="Group Shot" />
      </Main>
    )
  }
}


export default MainArea
