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
  color: var(--dark-blue);
  width: 85px;
  padding: 0;
  margin: 0;
`

const TrackerBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: -3px;
  padding-top: 0;
`

const TrackerUnit = styled.div`
  flex: 0 1 auto;
  font-size: 16px;
  width: 2.75vw;
  height: 2vw;
  background: var(--light-gray);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  text-align: center;
  line-height: 2vw;
  margin: 0 .075em 0 0;
  padding: 0;
  z-index: -1;

  &::first-of-kind {
    margin-left: 0;
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
  color: var(--dark-blue);
  width: 85px;
  padding: 0;
  margin: 0;
`

const TimerBar = styled.div`
  position: relative;
  top: 8px;
  width: 100%;
  margin-top: 0;
  padding-top: 0;
  z-index: -2;
`

const TimerFiller = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--medium-green);
  transition: 20s width;

  &.is-running {
    width: 1px;
  }
`


const TrackerTimer = (props) => {
  const trackerUnits = [];
  for (let i = 0; i < 20; i++) {
    if (props.results && props.results[i]) {
      if (props.results[i].isCorrect) {
        trackerUnits[i] = (<CorrectTrackerUnit>{i}</CorrectTrackerUnit>)
      } else {
        trackerUnits[i] = (<IncorrectTrackerUnit>{i}</IncorrectTrackerUnit>)
      }
    } else if (i === props.q - 1) {
      trackerUnits[i] = (<ActiveTrackerUnit>{i}</ActiveTrackerUnit>)
    } else {
      trackerUnits[i] = (<TrackerUnit>{i}</TrackerUnit>)
    }
  }

  return (
    <TrackerTimerWrapper>
      <Tracker>
        <TrackerLabel>Question:</TrackerLabel>
        <TrackerBar>
          {trackerUnits}
        </TrackerBar>
      </Tracker>
      <Timer>
        <TimerLabel>Timer:</TimerLabel>
        <TimerBar>
          <TimerFiller id='timer-filler'></TimerFiller>
        </TimerBar>
      </Timer>
    </TrackerTimerWrapper>
  )
}

export default TrackerTimer