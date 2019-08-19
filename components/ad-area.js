import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Ad = styled.section`
  grid-area: ad;
`

class AdArea extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Ad role="contentinfo" id="ad-section">
      </Ad>
    )
  }
}

export default AdArea
