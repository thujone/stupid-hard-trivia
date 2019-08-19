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
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>
        <div className="addthis_inline_share_toolbox"></div>
      </Ad>
    )
  }
}

export default AdArea
