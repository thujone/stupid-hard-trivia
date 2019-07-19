import Link from 'next/link'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
`

const Header = styled.div`
  grid-area: header;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  display: none;

  @media (min-width: 730px) {
    flex-direction: row;
    display: flex;
  }
`

const MastHeader = styled.h2`
  line-height: 1em;
  margin: 0;
  text-shadow:
    0 0 5px #eee,
    0 0 10px #ddd,
    0 0 15px #ccc,
    0 0 20px #bbb,
    0 0 30px #aaa;
  font-size: 6vw;

  div {
    display: inline;
    margin: 0 3px;
  }

  @media (min-width: 600px) {
    font-size: 3.2vw;

    div {
      display: block;
      margin: 0;
      clear: both;
    }
  }

  @media (min-width: 1200px) {
    font-size: 3vw;
  }

  @media (min-width: 1500px) {
    font-size: 2vw;
  }
`

const MastHeaderLeft = styled(MastHeader)`

  div {
    float: left;
  }

  @media (min-width: 600px) {
    float: right;
    clear: both;

    div {
      float: right;
    }
  }
`

const MastHeaderRight = styled(MastHeader)`
  float: right;  

  div {
    position: relative;
    top: -15px;
    right: 5px;
    margin-left: 5px;
  }

  @media (min-width: 600px) {
    position: absolute;
    bottom: 27px;
  }
`

const MastLeft = styled.div`
  flex: 0 1 auto;
  text-align: left;
  padding-top: 0;
  min-width: 15vw;

  @media (min-width: 600px) {
    padding-top: 1.1em;
  }
`

const SeinfeldLogo = styled.div`
  flex: 0 1 auto;
  text-align: center;
  justify-content: center;
`

const LogoObject = styled.object`
  height: 190px;
  width: 430px;
`

const MastRight = styled.div`
  flex: 0 1 auto;
  text-align: left;
  padding-top: 0;
  position: relative;
  min-width: 15vw;
`

const TinyHeader = styled.header`
  display: flex;
  justify-content: center;

  @media (min-width: 730px) {
    display: none;
  }
`

const TinyTitle = styled.h2`
  line-height: 1em;
  margin: 0 20px;
  text-shadow:
    0 0 5px #eee,
    0 0 10px #ddd,
    0 0 15px #ccc,
    0 0 20px #bbb;
  font-size: 16px;

  @media (min-width: 600px) { 
    font-size: 24px;
  }

  @media (min-width: 900px) {
    font-size: 2.2vw;
  }
`

const TinySeinfeldLogo = styled.img`
  position: relative;
  top: 6px;
  height: 6vw;
  max-height: 70px;
  min-height: 35px;
  line-height: 1em;
  margin: 0 10px 0 7px;

  @media (min-width: 600px) {
    top: 13px;
  }
`


const HeaderArea = () => (
  <HeaderWrapper>
    <Header>
      <MastLeft>
        <MastHeaderLeft>
          <div>The</div>
          <div>Stupid-Hard</div>
        </MastHeaderLeft>
      </MastLeft>
      <SeinfeldLogo>
        <LogoObject type="image/svg+xml" data="/static/graphics/seinfeld-logo.svg">
        </LogoObject>
      </SeinfeldLogo>
      <MastRight>
        <MastHeaderRight>
          <div>Trivia</div>
          <div>Challenge<sup>&trade;</sup></div>
        </MastHeaderRight>
      </MastRight>
    </Header>
    <TinyHeader>
      <TinyTitle>
        The Stupid-Hard
        <TinySeinfeldLogo src='/static/graphics/seinfeld-logo-sizable.svg' alt='Seinfeld logo' />
        Trivia Challenge<sup>&trade;</sup>
      </TinyTitle>
    </TinyHeader>
  </HeaderWrapper>
)

export default HeaderArea
