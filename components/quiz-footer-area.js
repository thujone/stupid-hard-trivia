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

const TopAlignImage = styled.img`
  vertical-align: top;
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

        Email: <a href={'mailto:hello@seinfeldtrivia.net'} target='_new'>hello@seinfeldtrivia.net</a>
        &nbsp;&nbsp;|&nbsp;
        Facebook: <a href={'https://www.facebook.com/The-Stupid-Hard-Seinfeld-Trivia-Challenge-105680037465740'} target='_new'>The Stupid-Hard Seinfeld Trivia Challenge</a>
        &nbsp;&nbsp;|&nbsp;
        Twitter: <a href={'https://twitter.com/HardTrivia'} target='_new'>@HardTrivia</a>
        <br />
        Copyright &copy;2020 by Stupid Hard Trivia. All rights reserved.
        &nbsp;&nbsp;
        <a href={'/static/privacy_policy.html'} target='_new'>Privacy Policy</a>
        &nbsp;&nbsp;|&nbsp;
        <a href={'/static/terms_and_conditions.html'} target='_new'>Terms & Conditions</a>
        <br />
        <br />
        <a href="https://click.linksynergy.com/fs-bin/click?id=8TuoI7nE/dI&offerid=509570.10000269&subid=0&type=4"><img border="0" width="300"   alt="Stacy Adams" src="https://ad.linksynergy.com/fs-bin/show?id=8TuoI7nE/dI&bids=509570.10000269&subid=0&type=4&gridnum=15" /></a>
        &nbsp;&nbsp;
	<a href="https://click.linksynergy.com/fs-bin/click?id=8TuoI7nE/dI&offerid=581986.36&subid=0&type=4"><TopAlignImage border="0" width="300" alt="Bugatchi 1080x1080" src="https://ad.linksynergy.com/fs-bin/show?id=8TuoI7nE/dI&bids=581986.36&subid=0&type=4&gridnum=0" /></a>
        <br />
        <br />
      </QuizFooter>
    )
  }
}


export default QuizFooterArea
