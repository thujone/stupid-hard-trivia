

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
	  <script data-ad-client="ca-pub-9696617814444089" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="description" content="The ultimate Seinfeld trivia quiz! Free to play! Over 300 questions for three levels: Easy, Hard, and Stupid-Hard!" />
          <meta name="keywords" content="Seinfeld,trivia,game,quiz,challenge,fun" />
          <meta name="author" content="Stupid-Hard Trivia" />
          <meta property="og:url" content="https://seinfeldtrivia.com" />
          <meta property="og:title" content="The Stupid-Hard Seinfeld Trivia Challenge" />
          <meta property="og:description" content="The ultimate Seinfeld trivia quiz! Free to play! Over 300 questions for three levels: Easy, Hard, and Stupid-Hard!" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://seinfeldtrivia.com/static/graphics/game-logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.title = 'The Stupid-Hard Seinfeld Trivia Challenge'
                if (location.protocol !== 'https:' && location.href.indexOf('localhost') === -1) {
                  location.replace('https:' + location.href.substring(location.protocol.length))
                }
                window.fbAsyncInit = function() {
                  FB.init({
                    appId            : '2380773312188622',
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v4.0'
                  })
                }
                window.dataLayer = window.dataLayer || [];
                function gtag(){ window.dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'UA-163408812-1');
              `
            }}
          >
          </script>
          <div className="addthis_inline_share_toolbox"></div>
          <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
          <script className="add-this" type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d5a12a287ecab9a"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
