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
    >
    </QuizLayout>
  )
}

Quiz.getInitialProps = async function() {
  const questionsResult = await fetch('https://seinfeldtrivia.net:3010/questions')
  const questionsData = await questionsResult.json()
  const episodesResult = await fetch('https://seinfeldtrivia.net:3010/episodes')
  const episodesData = await episodesResult.json()
  console.log('Quiz::questionsData', questionsData)
  return {
    questions: questionsData.map(question => question),
    episodes: episodesData.map(episode => episode)
  }
}


export default Quiz
