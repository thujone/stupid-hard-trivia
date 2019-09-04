import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const QuizFooter = styled.footer`
  grid-area: quiz-footer;

  .addthis_inline_share_toolbox {
    display: block !important;
    min-height: 36px !important;
  }
`

class QuizFooterArea extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    return (
      <QuizFooter role="footer">
      </QuizFooter>
    )
  }
}


export default QuizFooterArea
