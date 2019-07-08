import Link from 'next/link'
import styled from 'styled-components'

const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const MastHeader = styled.h2`
  line-height: 1em;
  text-shadow:
    0 0 5px #eee,
    0 0 10px #ddd,
    0 0 15px #ccc,
    0 0 20px #bbb,
    0 0 30px #aaa;
`

const MastHeaderLeft = styled(MastHeader)`
  margin-top: 10px;
`

const MastHeaderRight = styled(MastHeader)`
  margin-top: 58px;
`

const MastLeft = styled.div`
  flex: 0 1 auto;
  text-align: right;
`

const SeinfeldLogo = styled.object`
  flex: 0 1 auto;
`

const MastRight = styled.div`
  flex: 0 1 auto;
  text-align: left;
`



const Header = () => (
  // <div>
  //   <Link href="/">
  //     <a style={linkStyle}>Home</a>
  //   </Link>
  //   <Link href="/about">
  //     <a style={linkStyle}>About</a>
  //   </Link>
  <HeaderRow>
    <MastLeft>
      <MastHeaderLeft>The <br /> Stupid-Hard</MastHeaderLeft>
    </MastLeft>
    <SeinfeldLogo type="image/svg+xml" data="/static/graphics/seinfeld-logo.svg" height="190" width="430"></SeinfeldLogo>
    <MastRight>
      <MastHeaderRight>Trivia <br /> Challenge!!!</MastHeaderRight>
    </MastRight>
  </HeaderRow>
)

export default Header
