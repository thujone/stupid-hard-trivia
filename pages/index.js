import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'


const Index = props => (
  <Layout avatars={props.avatars}>
  </Layout>
)

Index.getInitialProps = async function() {
  const avatarsResult = await fetch('http://localhost:3010/avatars')
  const avatarsData = await avatarsResult.json()

  return {
    avatars: avatarsData.map(avatars => avatars)
  }
}

export default Index
