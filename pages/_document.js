

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163408812-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'UA-163408812-1');
          </script>
          <script>
            {/* if (location.protocol !== 'https:') {
              location.replace(`https:${location.href.substring(location.protocol.length)}`)
            } */}
            window.fbAsyncInit = function() {
              FB.init({
                appId            : '2380773312188622',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v4.0'
              })
            }
          </script>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <meta name="description" content="The ultimate Seinfeld trivia quiz! Free to play! Over 300 questions for three levels: Easy, Hard, and Stupid-Hard!" />
          <meta name="keywords" content="Seinfeld,trivia,game,quiz,challenge,fun" />
          <meta name="author" content="Stupid-Hard Trivia(TM)" />
          <meta property="og:url" content="https://seinfeldtrivia.net" />
          <meta property="og:title" content="The Stupid-Hard Seinfeld Trivia Challenge(TM)" />
          <meta property="og:description" content="The ultimate Seinfeld trivia quiz! Free to play! Over 300 questions for three levels: Easy, Hard, and Stupid-Hard!" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://seinfeldtrivia.net/static/graphics/game-logo.png" />
          <title>The Stupid-Hard Seinfeld Trivia Challenge</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div class="addthis_inline_share_toolbox"></div>

          <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
          <script class="add-this" type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
