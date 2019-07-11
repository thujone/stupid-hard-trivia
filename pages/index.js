import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'


const Index = props => (
  <Layout avatars={props.avatars} questions={props.questions} episodes={props.episodes}>
  </Layout>
)

Index.getInitialProps = async function() {
  const questionsResult = await fetch('http://localhost:3010/questions')
  const questionsData = await questionsResult.json()
  const episodesResult = await fetch('http://localhost:3010/episodes')
  const episodesData = await episodesResult.json()
  const avatarsResult = await fetch('http://localhost:3010/avatars')
  const avatarsData = await avatarsResult.json()

  return {
    questions: questionsData.map(entry => entry),
    episodes: episodesData.map(episode => episode),
    avatars: avatarsData.map(avatars => avatars)
  }
}

export default Index
