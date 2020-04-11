import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Footer = styled.footer`
  grid-area: footer;
`

class FooterArea extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <Footer role="footer">




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

        <a href="https://click.linksynergy.com/fs-bin/click?id=8TuoI7nE/dI&offerid=701470.3&subid=0&type=4"><img border="0"   alt="SEGA Shop" src="https://ad.linksynergy.com/fs-bin/show?id=8TuoI7nE/dI&bids=701470.3&subid=0&type=4&gridnum=4" /></a>
          &nbsp; &nbsp;
        <a href="https://click.linksynergy.com/fs-bin/click?id=8TuoI7nE/dI&offerid=115554.10001551&subid=0&type=4"><img border="0"   alt="LEGO Brand Retail" src="https://ad.linksynergy.com/fs-bin/show?id=8TuoI7nE/dI&bids=115554.10001551&subid=0&type=4&gridnum=0"/></a>
          &nbsp; &nbsp;
        <a href="https://click.linksynergy.com/fs-bin/click?id=8TuoI7nE/dI&offerid=486358.116&subid=0&type=4"><img border="0"   alt="Show your love of The Times. Shop Now!" src="https://ad.linksynergy.com/fs-bin/show?id=8TuoI7nE/dI&bids=486358.116&subid=0&type=4&gridnum=11" /></a>
          &nbsp; &nbsp;
        <a href="https://click.linksynergy.com/fs-bin/click?id=8TuoI7nE/dI&offerid=526182.210&type=4&subid=0"><img alt="The MET" border="0" src="https://s3-us-west-2.amazonaws.com/themet/iGive/opt1-125x125.jpg" /></a><img border="0" width="1" height="1" src="https://ad.linksynergy.com/fs-bin/show?id=8TuoI7nE/dI&bids=526182.210&type=4&subid=0" />
        <br />
        <br />
      </Footer>
    )
  }
}


export default FooterArea
