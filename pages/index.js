import React, { Component } from 'react'
import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'


class Index extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
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
  const avatarsResult = await fetch('https://seinfeldtrivia.net:3010/avatars')
  const avatarsData = await avatarsResult.json()

  return {
    avatars: avatarsData.map(avatars => avatars)
  }
}
export default Index
