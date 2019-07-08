import Link from 'next/link'
import styled from 'styled-components'

const SeinfeldLogo = styled.object`
  display: inline-block;
`
  

const Header = () => (
  // <div>
  //   <Link href="/">
  //     <a style={linkStyle}>Home</a>
  //   </Link>
  //   <Link href="/about">
  //     <a style={linkStyle}>About</a>
  //   </Link>
  <h1>
    Stupid-Hard
    <SeinfeldLogo type="image/svg+xml" data="/static/graphics/seinfeld-logo.svg" height="200" width="800"></SeinfeldLogo>
  </h1>
)

export default Header
