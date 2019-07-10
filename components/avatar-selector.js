import styled from 'styled-components'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'

const SelectorWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border: .67em double #012999;
  border-radius: 1.3em;
  background: #7199df;
  padding: 1.1em 1.3em;
  min-height: 300px;

  @media (min-width: 600px) {
    border: 1em double #012999;
    min-height: 300px;
  }

  h1 {
    font-family: Bangers;
    color: #012999;
    text-align: left;
    margin-top: 0;
    line-height: 1em;
  }
`

const SelectorHeader = styled.h1`
  float: left;
  display: block;
  height: 50px;
  width: 50%;
`

const AvatarMessageWrapper = styled.div`
  height: 40px;
  width: 50%;
  opacity: 0;
`

const AvatarMessage = styled.div`
  height: 40px;
`

const AvatarTypes = styled.div`
  display: flex;
  clear: both;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const AvatarButton = styled.button`
  flex: 0 1 33%;
  height: 150px;
  width: 150px;
  border: 3px solid #1a1a1a;
  border-radius: 10px;
  font-family: Lalezar;
  font-size: 2em;
  text-shadow: 0px 1px 1px #666;
  color: #1a1a1a;
  cursor: pointer;
  padding: 0;

  @media (min-width: 600px) {
    border: 6px solid #1a1a1a;
  }

  &:hover {
    border-color: #e43530;
    background-color: #fbd84a;
    color: #e43530;
    text-shadow: 0px 1px 1px #f95045;
    transition: all .6s;
  }
`

const AvatarGraphic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`


class AvatarSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.level,
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

  render() {
    return (
      <SelectorWrapper>
        <SelectorHeader>Choose an avatar:</SelectorHeader>
        <AvatarMessageWrapper>
          <AvatarMessage id="jackie-message">
            Jackie
          </AvatarMessage>
          <AvatarMessage id="pagliacci-message">
            Pagliacci
          </AvatarMessage>
          <AvatarMessage id="marisa-message">
            Marisa Tomei
          </AvatarMessage>
          <AvatarMessage id="puddy-message">
            Puddy
          </AvatarMessage>
          <AvatarMessage id="estelle-message">
            Estelle
          </AvatarMessage>
          <AvatarMessage id="soup-nazi-message">
            Soup Nazi
          </AvatarMessage>
          <AvatarMessage id="mickey-message">
            Mickey
          </AvatarMessage>
          <AvatarMessage id="emily-message">
            Emily
          </AvatarMessage>
          <AvatarMessage id="frank-message">
            Frank
          </AvatarMessage>
          <AvatarMessage id="newman-message">
            Newman
          </AvatarMessage>
        </AvatarMessageWrapper>   
        <AvatarTypes>
          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.jackieHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('jackie')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ jackieHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/jackie.jpg'
                alt='Jackie'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.pagliacciHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('pagliacci')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ pagliacciHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/pagliacci.png'
                alt='Pagliacci'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.marisaHidden}
              type='triangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('marisa')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ marisaHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/marisa.jpg'
                alt='Marisa Tomei'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.puddyHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('puddy')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ puddyHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/puddy.jpg'
                alt='Puddy'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.estelleHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('estelle')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ estelleHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/estelle.jpg'
                alt='Estelle'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.soupNaziHidden}
              type='triangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('soup-nazi')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ soupNaziHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/soup-nazi.png'
                alt='Soup Nazi'
              />
            </AvatarButton>
          </ParticleEffectButton>


          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.mickeyHidden}
              type='triangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('mickey')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ mickeyHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/mickey.jpg'
                alt='Mickey'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.emilyHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('puddy')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ emilyHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/emily.jpg'
                alt='Emily'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.frankHidden}
              type='rectangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('frank')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ frankHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/frank.jpg'
                alt='Frank'
              />
            </AvatarButton>
          </ParticleEffectButton>

          <ParticleEffectButton
              color='#e43530'
              hidden={this.state.newmanHidden}
              type='triangle'
              direction='top'
              duration={1000}
              onComplete={(e) => this.setAvatar('newman')}
          >
            <AvatarButton
              onMouseOver={(e) => console.log('img mouseover')}
              onMouseOut={(e) => console.log('img mouseout')}
              onClick={() => this.setState({ newmanHidden: true })}
            >
              <AvatarGraphic
                src='/static/avatars/newman.jpg'
                alt='Newman'
              />
            </AvatarButton>
          </ParticleEffectButton>
        </AvatarTypes>
      </SelectorWrapper>
    )
  }
}

export default AvatarSelector
