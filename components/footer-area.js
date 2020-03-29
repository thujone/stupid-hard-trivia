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
        <br />
        <br />
        

      </Footer>
    )
  }
}


export default FooterArea
