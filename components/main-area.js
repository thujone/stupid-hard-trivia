import styled from 'styled-components'
import React, { Component } from 'react'
import LevelSelector from './level-selector'
import AvatarSelector from './avatar-selector'
import FirstNameForm from './first-name-form'

const Main = styled.main`
  grid-area: main;
  padding: 0 1em;
`

class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      level: null,
      avatar: null,
      avatars: props.avatars,
      firstName: null,
      questionNumber: null,
    }
  }

  setStateHandler = (data) => {
    this.setState(data)
  }

  render() {
    return (
      <Main role='main'>
        {this.state.view === 'home' &&
          <LevelSelector
            setStateHandler={this.setStateHandler}
          />
        }
        {this.state.view === 'avatar' &&
          <AvatarSelector
            level={this.state.level}
            avatars={this.props.avatars}
            setStateHandler={this.setStateHandler}  
          />
        }
        {this.state.view === 'first-name' &&
          <FirstNameForm
            level={this.state.level}
            avatar={this.state.avatar}
            setStateHandler={this.setStateHandler}
            questions={this.props.questions}
            episodes={this.props.episodes}
          />
        }
      </Main>
    )
  }
}

export default MainArea
