import React, { Component } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'
import QuizLayout from '../components/quiz-layout'
import ParticleEffectButton from 'react-particle-effect-button'
import Link from 'next/link'

const Quiz = (props) => {
  const router = useRouter()
  return (
    <QuizLayout
      questions={props.questions}
      episodes={props.episodes}
      level={router.query.level}
      avatar={router.query.avatar}
      name={router.query.name}
      isAudioEnabled={router.query.audio === 'true'}
    >
    </QuizLayout>
  )
}

Quiz.getInitialProps = async function() {
  const questionsResult = await fetch(`${process.env.REACT_APP_JSON_SERVER_URL}/questions`)
  const questionsData = await questionsResult.json()
  const episodesResult = await fetch(`${process.env.REACT_APP_JSON_SERVER_URL}/episodes`)
  const episodesData = await episodesResult.json()
  return {
    questions: questionsData.map(question => question),
    episodes: episodesData.map(episode => episode)
  }
}


export default Quiz
