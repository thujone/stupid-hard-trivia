import Link from 'next/link'
import styled from 'styled-components'

const Footer = styled.footer`
  grid-area: footer;
  display: none;
`

const FooterArea = () => (
  <Footer role="footer">
    <h4>Footer</h4>
  </Footer>
)

export default FooterArea
