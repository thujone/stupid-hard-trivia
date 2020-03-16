import styled from 'styled-components'
import React, { Component } from 'react'

const QuizScoreboardWrapper = styled.div`
  grid-area: scoreboard;
  padding: 0 10px;
  width: 100%;
`

const QuizScoreboard = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--light-blue);
  margin: auto;
  margin-top: 5px;
  padding: .2em;
  width: 100%;
  border: 4px double var(--dark-blue);
  border-radius: 10px;
  max-width: 960px;
`

const Avatar = styled.img`
  flex: 1 1 10em;
  max-width: 60px;
  max-height: 60px;
  border: 1px solid var(--dark-blue);
  border-radius: 10px;
  margin-right: 15px;
  transition: all 1s;
  cursor: progress;

  @media (min-width: 600px) {
    max-width: 80px;
    max-height: 80px;
  }


  &:hover {
    transform: scale(2.5);
  }
`

const UserTable = styled.table`
  flex: 1 1 9em;

  @media (min-width: 600px) {
    flex: 1 1 50em;
  }
`

const TableHeader = styled.th`
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 1em;
  text-align: left;
  padding: 0 .2em 0 0;
  line-height: 1;

  @media (min-width: 600px) {
    font-size: 1.3em;
  }
`

const TableHeaderName = styled(TableHeader)`
  width: 40px !important;

  @media (min-width: 600px) {
    width: 50px !important;
  }
`

const TableHeaderScore = styled(TableHeader)`

  text-align: right;
  position: relative;
  top: 14px;
  width: 40px;
  padding-left: 0 !important;

  @media (min-width: 600px) {
    padding-left: 25vw;
  }

  @media (min-width: 750px) {
    padding-left: 35vw;
  }

  @media (min-width: 900px) {
    padding-left: 42vw;
  }

  @media (min-width: 1200px) {
    padding-left: 28vw;
  }
`

const TableCell = styled.td`
  color: var(--dark-gray);
  font-size: 1em;
  padding: 0;
  margin: 0;
  line-height: 1.2em;
  width: 75px;

  @media (min-width: 600px) {
    font-size: 1.3em;
    width: auto;
  }
`

const TableCellMultiRow = styled(TableCell)`
  position: relative;
  top: 13px;

  @media (min-width: 600px) {
    top: 20px;
  }
`

const Score = styled.span`
  font-family: Erbos;
  color: var(--dark-gray);
`

const BigScore = styled(Score)`
  position: relative;
  top: 7px;
  font-size: 4em;
`

const GroupShotWrapper = styled.div`
  flex: 1 1 6em;
  text-align: right;
  position: relative;
`

const GroupShot = styled.img`
  position: relative;
  max-height: 76px;
  transition: all 1s;
  cursor: progress;
  display: none;
  
  @media (min-width: 600px) {
    display: block;
  }

  &:hover {
    transform: scale(3);
  }
`

const RestartIcon = styled.img`
  position: absolute;
  right: 100px;
  top: 14px;
`

const stringifyScore = (score) => {
  if (score === 0) {
    return '000'
  } else if (score < 100) {
    return '0' + score
  } else if (score >= 100) {
    return '' + score
  } else {
    return '1000'
  }
}

const QuizScoreboardArea = (props) => {
  console.log('QuizScoreboardArea::props', props)
  return (
    <QuizScoreboardWrapper>
      <QuizScoreboard>
        <Avatar src={`/static/avatars/medium/${props.avatar}.jpg`} alt={props.avatar} />
        <UserTable>
          <tbody>
            <tr>
              <TableHeaderName>Name:</TableHeaderName>
              <TableCell>{props.name}</TableCell>
              <TableHeaderScore>Score:</TableHeaderScore>
              <TableCellMultiRow rowspan="3"><BigScore>{(props.score || props.score === 0)  && stringifyScore(props.score)}</BigScore></TableCellMultiRow>
            </tr>
            <tr>
              <TableHeader>Level:</TableHeader>
              <TableCell>{props.level && props.level.split('').map((char, i) => (i === 0 || char === 'h') ? char.toUpperCase() : char)}</TableCell>
            </tr>
          </tbody>
        </UserTable>
        <GroupShotWrapper>
          <RestartIcon src='/static/graphics/restart-icon.png' alt="Restart Game" />
          <GroupShot src='/static/graphics/group-seated.png' alt="Group Seated" />
        </GroupShotWrapper>
      </QuizScoreboard>
    </QuizScoreboardWrapper>

  )
}

export default QuizScoreboardArea