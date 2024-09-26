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
        This game is 100% free and without paid ads, but I ask for donations
        <br />
        to help pay for the server costs, which add up to almost $1000 a year.
        <br />
        If you can spare a few bucks, please go to my Patreon page <a href="https://patreon.com/seinfeld4eva/shop" target="_new">here</a>. 
        <p />
        Email me at <a href="mailto:rich@comfypants.org" target="_new">rich@comfypants.org</a>.
        <p />
        Copyright &copy;2024 by Stupid Hard Trivia. All rights reserved.
        <br />
        <a href={'/static/privacy_policy.html'} target='_new'>Privacy Policy</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href={'/static/terms_and_conditions.html'} target='_new'>Terms & Conditions</a>
        <br />
        <br />
      </Footer>
    )
  }
}


export default FooterArea
