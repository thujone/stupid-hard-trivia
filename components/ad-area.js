import Link from 'next/link'
import styled from 'styled-components'

const Ad = styled.section`
  grid-area: ad;
  display: none;
`

const AdArea = () => (
  <Ad role="contentinfo" id="ad-section">
    <h4>Ad</h4>
  </Ad>
)

export default AdArea
