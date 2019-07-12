import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'
import React, { Component } from 'react'

import QuizLayout from '../components/quiz-layout'
import ParticleEffectButton from 'react-particle-effect-button'
import Link from 'next/link'


const Quiz = (props) => {
  return (
    <QuizLayout
      questions={props.questions}
      episodes={props.episodes}
    >
    </QuizLayout>
  )
}

Quiz.getInitialProps = async function() {
  const questionsResult = await fetch('http://localhost:3010/questions')
  const questionsData = await questionsResult.json()
  const episodesResult = await fetch('http://localhost:3010/episodes')
  const episodesData = await episodesResult.json()

  return {
    questions: questionsData.map(question => question),
    episodes: episodesData.map(episode => episode)
  }
}


export default Quiz
