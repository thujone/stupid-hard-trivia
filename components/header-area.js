import Link from 'next/link'
import styled from 'styled-components'

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
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

const MastRight = styled.div`
  flex: 0 1 auto;
  text-align: left;
  padding-top: 0;
  position: relative;
  min-width: 15vw;
`

const HeaderArea = () => (
  <Header>
    <MastLeft>
      <MastHeaderLeft>
        <div>The</div>
        <div>Stupid-Hard</div>
      </MastHeaderLeft>
    </MastLeft>
    <SeinfeldLogo>
      <object type="image/svg+xml" data="/static/graphics/seinfeld-logo.svg" height="190" width="430">
      </object>
    </SeinfeldLogo>
    <MastRight>
      <MastHeaderRight>
        <div>Trivia</div>
        <div>Challenge!!!</div>
      </MastHeaderRight>
    </MastRight>
  </Header>
)

export default HeaderArea
