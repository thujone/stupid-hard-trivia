import React, { Component } from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import Leaderboards from './leaderboards'
import LevelSelector from './level-selector'
import AvatarSelector from './avatar-selector'
import FirstNameForm from './first-name-form'


const Main = styled.main`
  grid-area: main;
  padding: 0 1em;
`

const NewFeatures = styled.div`
  text-align: center;
`

const NewFeatureButton = styled.button`
  flex: 0 1 auto;
  height: 40px;
  border: 3px solid var(--dark-gray);
  border-radius: 10px;
  margin: 0 5px 10px;
  font-family: Lalezar;
  font-size: 14px;
  text-shadow: 0px 1px 1px var(--very-light-gray);
  color: var(--dark-gray);
  cursor: pointer;
  padding: 6px 0 0;
  background: var(--medium-gray); 
  padding: 10px;
  min-width: 110px;

  &:hover {
    border-color: var(--medium-red);
    background-color: var(--medium-yellow);
    color: var(--medium-red);
    text-shadow: 0px 1px 1px var(--light-red);
    transition: all .4s;
  }
`

const DisableAudioButton = styled(NewFeatureButton)`
`

const ExcitingCallout = styled.span`
  font-size: 14px;
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
`

class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      level: null,
      avatar: null,
      avatars: props.avatars,
      firstName: null,
      questionNumber: null,
      isAudioEnabled: false
    }
  }

  setStateHandler = (data) => {
    this.setState(data)
  }

  enableAudio = () => {
    this.setState({ isAudioEnabled: true })
  }

  disableAudio = () => {
    this.setState({ isAudioEnabled: false })
  }

  showLeaderboards = () => {
    this.setState({view: 'leaderboards'})
  }


  render() {

    return (
      <Main role='main'>
        <NewFeatures>
          <NewFeatureButton onClick={this.showLeaderboards}>
            <ExcitingCallout>New!</ExcitingCallout>
            &nbsp;
            Leaderboards
          </NewFeatureButton>

          {!this.state.isAudioEnabled &&
            <NewFeatureButton onClick={this.enableAudio}>
              <FontAwesomeIcon icon={faVolumeUp} size="sm" />
              &nbsp;
              Enable Audio
            </NewFeatureButton>
          }

          {this.state.isAudioEnabled &&
            <DisableAudioButton onClick={this.disableAudio}>
              <FontAwesomeIcon icon={faVolumeMute} size="sm" />
              &nbsp;
              Disable Audio
            </DisableAudioButton>
          }
        </NewFeatures>

        {this.state.view === 'leaderboards' &&
          <>
            <Leaderboards
              setStateHandler={this.setStateHandler}
            />
            {this.state.isAudioEnabled &&
              <Sound
                url='../static/audio/seinfeld-4.mp3'
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
              />
            }
          </>
        }

        {this.state.view === 'home' &&
          <>
            <LevelSelector setStateHandler={this.setStateHandler} />
            {this.state.isAudioEnabled &&
              <Sound
                url='../static/audio/seinfeld-2.mp3'
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
              />
            }
          </>
        }
        {this.state.view === 'avatar' &&
          <>
            <AvatarSelector
              level={this.state.level}
              avatars={this.props.avatars}
              setStateHandler={this.setStateHandler}  
            />
            {this.state.isAudioEnabled &&
              <Sound
                url='../static/audio/seinfeld-7.mp3'
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
              />
            }
          </>
        }
        {this.state.view === 'first-name' &&
          <>
            <FirstNameForm
              level={this.state.level}
              avatar={this.state.avatar}
              setStateHandler={this.setStateHandler}
              questions={this.props.questions}
              episodes={this.props.episodes}
              isAudioEnabled={this.state.isAudioEnabled}
            />
            {this.state.isAudioEnabled &&
              <Sound
                url='../static/audio/seinfeld-6.mp3'
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
              />
            }
          </>
        }
      </Main>
    )
  }
}

export default MainArea
