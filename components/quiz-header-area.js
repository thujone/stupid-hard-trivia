import styled from 'styled-components'
import React, { Component } from 'react'

const QuizHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: center;
`

const Title = styled.h2`
  line-height: 1em;
  margin: 0 20px;
  text-shadow:
    0 0 5px #eee,
    0 0 10px #ddd,
    0 0 15px #ccc,
    0 0 20px #bbb;
    font-size: 16px;

    @media (min-width: 600px) {
      font-size: 24px
    }
  
    @media (min-width: 900px) {
      font-size: 2.2vw;
    }
`

const SeinfeldLogo = styled.img`
  position: relative;
  top: 6px;
  height: 6vw;
  max-height: 65px;
  min-height: 40px;
  line-height: 1em;
  margin: 0 10px 0 7px;
  
  @media (min-width: 600px) {
    top: 13px;
  }
`

const QuizHeaderArea = (props) => {
  return (
    <QuizHeader>
      <Title>
        The Stupid-Hard
        <SeinfeldLogo src='/static/graphics/seinfeld-logo-sizable.svg' alt='Seinfeld logo' />
        Trivia Challenge<sup>&trade;</sup>
      </Title>
    </QuizHeader>
  )
}

export default QuizHeaderArea