import styled from 'styled-components'
import React, { Component } from 'react'
import LevelSelector from './level-selector'
import AvatarSelector from './avatar-selector'
import FirstNameForm from './first-name-form'

const Main = styled.main`
  padding: 0 1em;
`

class QuizMainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.level,
      avatar: props.avatar,
      name: props.name,
      q: props.q,
    }
  }

  render() {
    console.log('props', this.props)
    return (
      <Main>
        <ul>
          <li>level: {this.props.level}</li>
          <li>avatar: {this.props.avatar}</li>
          <li>q: {this.props.q}</li>
          <li>name: {this.props.name}</li>
        </ul>
      </Main>
    )
  }
}

export default QuizMainArea