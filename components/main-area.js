import styled from 'styled-components'
import React, { Component } from 'react'
import LevelSelector from './level-selector'
import AvatarSelector from './avatar-selector'

const Main = styled.main`
  grid-area: main;
  padding: 0 1em;
`

class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: props.view,
      level: null,
      avatar: null
    }
  }

  setStateHandler = (data) => {
    this.setState(data)
    console.log('setView called', this.state)
  }

  render() {
    return (
      <Main role='main'>
        {this.state.view === 'home' &&
          <LevelSelector
            role='contentinfo'
            setStateHandler={this.setStateHandler}
          />
        }
        {this.state.view === 'avatar' &&
          <AvatarSelector
            role='contentinfo'
            level={this.state.level}
            setStateHandler={this.setStateHandler}  
          />
        }
        {this.state.view === 'first-name' &&
          <div>
            <h2>Level: {this.state.level}</h2>
            <h2>Avatar: {this.state.avatar}</h2>
            <br></br>
          </div>
        }
      </Main>
    )
  }
}

export default MainArea
