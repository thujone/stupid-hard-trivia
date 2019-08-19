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
    const scriptToAppend = `<script class="add-this" type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>`
    const frag = document.createRange().createContextualFragment(scriptToAppend)
    document.body.appendChild(frag)
  }

  render() {

    { console.log('this.props.touch', this.props.touch) }
    return (

      <Footer role="footer">
        {this.props.touch &&
          <span>
            <div className="addthis_inline_share_toolbox"></div>
          </span>
        }
      </Footer>
    )
  }
}


export default FooterArea
