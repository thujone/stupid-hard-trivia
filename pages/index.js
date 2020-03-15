import React, { Component } from 'react'
import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'


class Index extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  //   const divToAppend = `
  //     <script>
  //       window.fbAsyncInit = function() {
  //         FB.init({
  //           appId            : '2380773312188622',
  //           autoLogAppEvents : true,
  //           xfbml            : true,
  //           version          : 'v4.0'
  //         });
  //       };
  //     </script>
  //     <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
  //     <div class="addthis_inline_share_toolbox"></div>`
  //   const div = document.createRange().createContextualFragment(divToAppend)
  //   setTimeout(() => {
  //     document.body.appendChild(div)
  //   }, 500)
  //   const scriptToAppend =
  //     `<script class="add-this" type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>
  //     <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
  //     <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
  //     <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
  //     <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
  //     <link rel="manifest" href="/static/site.webmanifest">`
  //   const frag = document.createRange().createContextualFragment(scriptToAppend)
  //   setTimeout(() => {
  //     document.head.appendChild(frag)
  //     FB.ui({
  //       method: 'share_open_graph',
  //       action_type: 'og.likes',
  //       action_properties: JSON.stringify({
  //         object:'http://seinfeldtrivia.net',
  //       })
  //     }, function(response){
  //       // Debug response (optional)
  //       console.log(response);
  //     });
          
  //   }, 2500)
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
