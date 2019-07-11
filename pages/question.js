import QuizLayout from '../components/layout'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'
import Link from 'next/link'
import { useRouter } from 'next/router'

class Question extends Component {
  
  constructor(props) {
    super(props);
    const router = useRouter();
    debugger
  }



  render() {
    return (
      // <QuizLayout
      //   questions={this.props.questions}
      //   episodes={this.props.episodes}
      //   level={this.props.level}
      //   avatar={this.props.avatar}
      //   questionNumber={this.props.questionNumber}
      //   firstName={this.props.firstName}
      // >
      //   {console.log('Question::props', this.props)}
      // </QuizLayout>
      <div></div>
    )
  }
}

export default Question
