import Layout from '../components/layout'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'

// const DynamicLayout = dynamic(() => import('../components/layout'), {
//   ssr: false
// })

const Index = props => (
  <Layout>
    {/* <h2>Stupid-Hard Trivia presents</h2>
    <h1>The Ultimate Seinfeld Trivia Game</h1> */}
    <ul>
      
      {props.questions.map(question => {
        const episode = props.episodes.find(ep => ep.season === question.s && ep.episode === question.e);
        return (
          {/* <li key={question.id}>
            In "{episode.title}," {question.text}

            <ul>
              <li><Link><a>{question.option1}</a></Link></li>
              <li><Link><a>{question.option2}</a></Link></li>
              <li><Link><a>{question.option3}</a></Link></li>
              <li><Link><a>{question.option4}</a></Link></li>
              <li><Link><a>{question.option5}</a></Link></li>
              <li><Link><a>{question.answer}</a></Link></li>
            </ul>


            <Link as={`/p/${question.id}`} href={`/post?id=${question.id}`}>
              <a>{question.text}</a>
            </Link>

          </li> */}
        )
      })}
    </ul>
    {
      console.log('props.questions', typeof(props.questions), props.questions)
    }
    {
      console.log('props.episodes', typeof(props.episodes), props.episodes)
    }
  </Layout>

)

Index.getInitialProps = async function() {
  const questionsResult = await fetch('http://localhost:3010/questions')
  const questionsData = await questionsResult.json()
  const episodesResult = await fetch('http://localhost:3010/episodes')
  const episodesData = await episodesResult.json()

  return {
    questions: questionsData.map(entry => entry),
    episodes: episodesData.map(episode => episode)
  }
}

export default Index
