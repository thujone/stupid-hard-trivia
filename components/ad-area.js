import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Ad = styled.section`
  grid-area: ad;
  justify-content: center;
`

const AddThisToolbox = styled.div`
  margin: auto;
  text-align: center;
`

class AdArea extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Ad role="contentinfo" id="ad-section">
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>
        <AddThisToolbox className="addthis_inline_share_toolbox"></AddThisToolbox>
      </Ad>
    )
  }
}

export default AdArea
