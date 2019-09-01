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

class QuizFooterArea extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (document.getElementsByClassName('add-this').length > 0) {
      document.getElementsByClassName('add-this')[0].remove()
     }
    const scriptToAppend = `<script class="add-this" type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>`
    const frag = document.createRange().createContextualFragment(scriptToAppend)
    document.body.appendChild(frag)
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <QuizFooter role="footer">
        <span style={{visibility: 'hidden'}}>{this.props.q}</span>
        <div className="addthis_inline_share_toolbox"></div>
      </QuizFooter>
    )
  }
}


export default QuizFooterArea
