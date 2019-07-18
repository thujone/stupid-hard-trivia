import styled from 'styled-components'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'

const SelectorWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border: .67em double var(--dark-blue);
  border-radius: 1.3em;
  background: var(--light-blue);
  padding: 1.1em 1.3em .3em;
  min-height: 300px;

  @media (min-width: 600px) {
    border: 1em double var(--dark-blue);
    min-height: 300px;
  }

  h1 {
    font-family: Bangers;
    color: var(--dark-blue);
    text-align: left;
    margin-top: 0;
    line-height: 1em;
  }
`

const SelectorHeader = styled.h1`
  float: left;
  display: block;
  height: 50px;
  width: auto;
  margin-right: 5em;
`

const AvatarMessageWrapper = styled.div`
  height: 40px;
  width: 300px;
  float: left;
  display: none;

  @media (min-width: 730px) {
    display: block;
  }
`

const AvatarMessage = styled.div`
  font-size: 1.2em;
  text-align: center;
  line-height: 1.1em;
  padding-top: 12px;
  display: none;
  opacity: 0;
  height: auto;
  margin: auto;
  text-align: left;

  @media (min-width: 900px) {
    font-size: 1.5em;
  }
`

const AvatarTypes = styled.div`
  display: flex;
  clear: both;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`

const AvatarButton = styled.button`
  flex: 0 1 33%;
  height: 150px;
  width: 150px;
  border: 3px solid var(--dark-gray);
  border-radius: 10px;
  font-family: Lalezar;
  font-size: 2em;
  text-shadow: 0px 1px 1px var(--medium-gray);
  color: var(--dark-gray);
  cursor: pointer;
  padding: 0;
  margin-bottom: .7em;
  transition: all .4s;

  @media (min-width: 600px) {
    border: 6px solid var(--dark-gray);
  }

  &:hover {
    border-color: var(--medium-red);
    color: var(--dark-red);
  }
`

const AvatarGraphic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  opacity: .8;
  font-size: 1em;
  z-index: 1;
  transition: all .4s;

  &:hover {
    opacity: 1;
  }
`


class AvatarSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.level,
      avatars: props.avatars,
      avatar: null,
      jackieHidden: false,
      pagliacciHidden: false,
      marisaHidden: false,
      puddyHidden: false,
      estelleHidden: false,
      soupNaziHidden: false,
      mickeyHidden: false,
      emilyHidden: false,
      frankHidden: false,
      newmanHidden: false
    }
  }

  setAvatar = avatar => {
    this.setState({
      avatar: avatar
    })
    this.props.setStateHandler({
      avatar: avatar,
      view: 'first-name'
    })
  }

  activateParticleButton = avatar => {
    this.setState({ [`${avatar}Hidden`]: true })
  }

  showAvatarMessage = avatar => {
    document.getElementById(`${avatar}-message`).style.display = 'block'
    setTimeout( () => {
      document.getElementById(`${avatar}-message`).classList.add('is-visible')
    }, 15);
  }

  hideAvatarMessage = avatar => {
    document.getElementById(`${avatar}-message`).style.display = 'none'
    document.getElementById(`${avatar}-message`).classList.remove('is-visible')
  }


  render() {
    return (
      <SelectorWrapper>
        <SelectorHeader>Choose an avatar:</SelectorHeader>
        <AvatarMessageWrapper>
          {this.state.avatars.map(item => (
            <AvatarMessage key={item.id} id={`${item.id}-message`}>
              {item.name}
            </AvatarMessage>
          ))}
        </AvatarMessageWrapper>   
        <AvatarTypes>
          {this.state.avatars.map(item => (
            <ParticleEffectButton
                key={item.id}
                color='#e43530'
                hidden={this.state[`${item.id}Hidden`]}
                type='rectangle'
                direction='top'
                duration={700}
                onComplete={(e) => this.setAvatar(`${item.id}`)}
            >
              <AvatarButton
                onMouseOver={(e) => this.showAvatarMessage(`${item.id}`)}
                onMouseOut={(e) => this.hideAvatarMessage(`${item.id}`)}
                onClick={() => this.activateParticleButton(`${item.id}`)}
              >
                <AvatarGraphic
                  src={'/static/avatars/' + item.id + (item.isPng ? '.png' : '.jpg')}
                  alt={`${item.name}`}
                />
              </AvatarButton>
            </ParticleEffectButton>
          ))}
        </AvatarTypes>
      </SelectorWrapper>
    )
  }
}

export default AvatarSelector
