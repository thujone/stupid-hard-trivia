import styled from 'styled-components'
import React, { Component } from 'react'

const TrackerTimerWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: auto;
  z-index: -1;
`

const Tracker = styled.div`
  display: flex;
  width: 100%;
  max-width: 960px;
  margin: auto;
`

const TrackerLabel = styled.h3`
  font-size: 14px;
  color: var(--dark-blue);
  width: 60px;
  padding: 0;
  margin: 0;
  line-height: 1.6em;

  @media (min-width: 600px) {
    font-size: 18px;
    width: 85px;
    line-height: 1.2em;
  }
`

const TrackerBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1px;
  padding-top: 3px;

  @media (min-width: 600px) {
    margin-top: -1px;
  }

  @media (min-width: 750px) {
    margin-top: -3px;
  }

  @media (min-width: 900px) {
    margin-top: -6px;
  }
`

const TrackerUnit = styled.div`
  flex: 0 1 auto;
  font-size: 11px;
  width: 1em; 
  height: 1.6em;
  background: var(--light-gray);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  text-align: center;
  line-height: 1.6em;
  margin: 0 .075em 0 0;
  padding: 0;
  z-index: -1;

  &::first-of-kind {
    margin-left: 0;
  }

  @media (min-width: 360px) {
    width: 1.2em;
  }

  @media (min-width: 450px) {
    width: 1.5em;
  }

  @media (min-width: 600px) {
    width: 1.7em;
    height: 1.7em;
    line-height: 1.7em;
    font-size: 14px;
  }

  @media (min-width: 750px) {
    width: 1.85em;
    height: 1.85em;
    line-height: 1.85em;
    font-size: 16px;
  }

  @media (min-width: 900px) {
    width: 2em;
    height: 2em;
    line-height: 2em;
    font-size: 16px;
  }
  
`

const ActiveTrackerUnit = styled(TrackerUnit)`
  background: var(--dark-gray);
  color: var(--very-light-gray);
`

const CorrectTrackerUnit = styled(TrackerUnit)`
  background: var(--medium-green);
`

const IncorrectTrackerUnit = styled(TrackerUnit)`
  background: var(--bright-red);
`

const Timer = styled.div`
  display: flex;
  width: 100%;
  max-width: 960px;
  margin: auto;
`

const TimerLabel = styled.h3`
  font-size: 14px;
  color: var(--dark-blue);
  width: 60px;
  padding: 0;
  margin: 0;
  line-height: 1.6em;

  @media (min-width: 600px) {
    font-size: 18px;
    width: 85px;
    line-height: 1.2em;
  }
`

const TimerBar = styled.div`
  position: relative;
  top: 8px;
  width: 100%;
  margin-top: 0;
  padding-top: 0;
`

const TimerFiller = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--medium-green);
  transition: width 15s;
  transition-timing-function: linear;

  &.is-running {
    width: 1px !important;
    transition: width 15s;
    transition-timing-function: linear;
  }
`

const Seconds = styled.span`
  display: none;
`


class TrackerTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      q: this.props.q,
      results: this.props.results,
      stopTimer: this.props.stopTimer,
      allDone: this.props.allDone
    }

    this.secondsLeft = 15
    this.intervalHandle
    this.startCountdown = this.startCountdown.bind(this)
    this.tick = this.tick.bind(this)
  }

  startCountdown() {
    this.intervalHandle = setInterval(this.tick, 1000)

    setTimeout( () => {
      this.timerFiller.classList.add('is-running')
    }, 50)
  }

  tick() {
    this.secondsLeft--
    this.seconds.innerText = this.secondsLeft
    console.log('seconds left', this.secondsLeft, this.seconds.innerText)
    if (this.secondsLeft <= 0) {
      clearInterval(this.intervalHandle)
      this.props.checkResponse(null, null, this.secondsLeft)
      this.secondsLeft = 15
    }
  }

  componentDidMount() {
    console.log('did mount')
    
  }

  componentDidUpdate() {
    clearInterval(this.intervalHandle)

    if (this.props.q <= 20) {
      if (this.props.stopTimer) {
        clearInterval(this.intervalHandle)
        let computedStyle = window.getComputedStyle(this.timerFiller)
        let timerFillerWidth = computedStyle.getPropertyValue('width')
        this.timerFiller.classList.remove('is-running')
        this.timerFiller.style.width = timerFillerWidth;

      } else {
        this.timerFiller.style.display = 'none'
        setTimeout(() => {
          
          this.timerFiller.style.display = 'block'
          this.timerFiller.style.width = '100%'
          this.startCountdown()
        }, 50);
      }
      this.secondsLeft = 15
    }
  }

  createTrackerUnits() {
    let trackerUnits = []
    for (let i = 0; i < 20; i++) {
      if (this.props.results && this.props.results[i]) {
        if (this.props.results[i].isCorrect) {
            trackerUnits[i] = (<CorrectTrackerUnit key={`tracker-unit-${i}`}>{i + 1}</CorrectTrackerUnit>)
        } else {
            trackerUnits[i] = (<IncorrectTrackerUnit key={`tracker-unit-${i}`}>{i + 1}</IncorrectTrackerUnit>)
        }
      } else if (i === this.props.q - 1) {
        trackerUnits[i] = (<ActiveTrackerUnit key={`tracker-unit-${i}`}>{i + 1}</ActiveTrackerUnit>)
      } else {
        trackerUnits[i] = (<TrackerUnit key={`tracker-unit-${i}`}>{i + 1}</TrackerUnit>)
      }
    }
    return trackerUnits
  }

  render() {
    return (
      <TrackerTimerWrapper>
        <Tracker>
          <TrackerLabel>Question:</TrackerLabel>
          <TrackerBar>
            {this.createTrackerUnits()}
          </TrackerBar>
        </Tracker>
        {this.props.q <= 20 &&
          <Timer>
            <TimerLabel>Timer:</TimerLabel>
            <TimerBar>
              <TimerFiller id='timer-filler' ref={(filler) => this.timerFiller = filler}></TimerFiller>
            </TimerBar>
          </Timer>
        }
        <Seconds id='seconds' ref={(seconds) => { this.seconds = seconds }}></Seconds>
      </TrackerTimerWrapper>
    )
  }
}

export default TrackerTimer