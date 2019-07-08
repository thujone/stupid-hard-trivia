import Header from '../components/header'
import GlobalStyle from './global-style'
import dynamic from 'next/dynamic'


const DynamicHeader = dynamic(() => import('../components/header'), {
  ssr: false
})


const Layout = props => (
  <div>
    <GlobalStyle />
    <DynamicHeader />
    {props.children}
  </div>
)

export default Layout
