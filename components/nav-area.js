import Link from 'next/link'
import styled from 'styled-components'

const Nav = styled.div`
  grid-area: nav;
`

const NavArea = () => (
  <Nav>
    <nav role="nav">
      <h4>Nav</h4>
      {/* <ul role="navigation">
        <li></li>
      </ul> */}
    </nav>
  </Nav>
)

export default NavArea
