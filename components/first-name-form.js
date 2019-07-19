import styled from 'styled-components'
import React, { Component } from 'react'
import ParticleEffectButton from 'react-particle-effect-button'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SelectorWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border: .5em double var(--dark-blue);
  border-radius: 1.3em;
  background: var(--light-blue);
  padding: 1.1em 1.3em;
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
  width: 90%;
`

const Button = styled.button`
  flex: 0 1 auto;
  height: 70px;
  width: 220px;
  border: 3px solid var(--dark-gray);
  border-radius: 15px;
  margin-top: 20px;
  font-family: Lalezar;
  font-size: 2em;
  text-shadow: 0px 1px 1px var(--very-light-gray);
  color: var(--dark-gray);
  cursor: pointer;
  padding: 6px 0 0;
  background: var(--medium-gray);

  @media (min-width: 600px) {
    border: 6px solid var(--dark-gray);
  }

  &:hover {
    border-color: var(--medium-red);
    background-color: var(--medium-yellow);
    color: var(--medium-red);
    text-shadow: 0px 1px 1px var(--light-red);
    transition: all .4s;
  }
`

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FirstNameField = styled.input`
  font-size: 2em;
  width: 220px;
  background-color: var(--very-light-gray);
  padding: 10px;
  border: 2px dotted var(--dark-blue);
  border-radius: 15px;
  outline: none;
`

class FirstNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.level,
      avatar: props.avatar,
      firstNameField: '',
      buttonHidden: false
    }
  }

  componentDidMount() {
    this.firstNameInput.focus()
  }

  activateParticleButton = () => {
    this.setState({ buttonHidden: true })
  }

  onFirstNameFieldChange = (event) => {
    this.setState({ firstNameField: event.target.value })
  }

  render() {
    return (
      <SelectorWrapper>
        <SelectorHeader>Enter your name:</SelectorHeader>
        <Form>
          <FirstNameField
            id='first-name-input'
            placeholder='Babu Bhatt'
            ref={(input) => { this.firstNameInput = input }}
            maxLength='16'
            type='text'
            onChange={this.onFirstNameFieldChange.bind(this)}
          />
          <ParticleEffectButton
              color='#fbd84a'
              hidden={this.state.buttonHidden}
              type='rectangle'
              direction='top'
              duration={700}
          >
            <Link
              href={{
                pathname: '/quiz',
                query: {
                  level: this.props.level,
                  avatar: this.props.avatar,
                  name: this.state.firstNameField
                }
              }}
            >
              <Button> {/*onClick={(e) => this.activateParticleButton()}> */}
                Serenity Now!
              </Button>
            </Link>
          </ParticleEffectButton>
        </Form>
      </SelectorWrapper>
    )
  }
}

export default FirstNameForm
