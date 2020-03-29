import React, { Component } from 'react'
import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'


class Index extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const divToAppend = `
      <div class="addthis_inline_share_toolbox"></div>`
    const div = document.createRange().createContextualFragment(divToAppend)
    setTimeout(() => {
      document.body.appendChild(div)
    }, 500)
    const scriptToAppend = `
      <script class="add-this" type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
      <link rel="manifest" href="/static/site.webmanifest">
      <meta name="description" content="The ultimate Seinfeld trivia quiz! Free to play! Over 300 questions for three levels: Easy, Hard, and Stupid-Hard!">
      <meta name="keywords" content="Seinfeld,trivia,game,quiz,challenge,fun">
      <meta name="author" content="Stupid-Hard Trivia(TM)">
      <meta property="og:url" content="http://seinfeldtrivia.net" />
      <meta property="og:title" content="The Stupid-Hard Seinfeld Trivia Challenge(TM)" />
      <meta property="og:description" content="The ultimate Seinfeld trivia quiz! Free to play! Over 300 questions for three levels: Easy, Hard, and Stupid-Hard!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="http://seinfeldtrivia.net/static/graphics/game-logo.png" />
      <script>
        document.title = 'The Stupid-Hard Seinfeld Trivia Challenge'
      </script>
    `
    const frag = document.createRange().createContextualFragment(scriptToAppend)
    setTimeout(() => {
      document.head.appendChild(frag)
    }, 2500)

    document.addEventListener('touchstart', function(e) {}, true)
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <Layout avatars={this.props.avatars}>
      </Layout>
    )
  }
}

Index.getInitialProps = async function() {
  const avatarsResult = await fetch('http://localhost:3010/avatars')
  const avatarsData = await avatarsResult.json()

  return {
    avatars: avatarsData.map(avatars => avatars)
  }
}
export default Index
