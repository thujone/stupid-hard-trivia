import styled from 'styled-components'
import React, { Component } from 'react'

const QuizScoreboard = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--light-blue);
  margin: auto;
  margin-top: 5px;
  padding: .2em;
  max-width: 960px;
  width: 100%;
  border: 4px double var(--dark-blue);
  border-radius: 10px;
`

const Avatar = styled.img`
  flex: 1 1 10em;
  max-width: 80px;
  max-height: 80px;
  border: 1px solid var(--dark-blue);
  border-radius: 10px;
  margin-right: 15px;
  transition: all 1s;
  cursor: progress;

  &:hover {
    transform: scale(2.5);
  }
`

const UserTable = styled.table`
  flex: 1 1 50em;
`

const TableHeader = styled.th`
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 1.3em;
  text-align: left;
  padding: 0 .2em 0 0;
  line-height: 1.3=2em;
`

const TableHeaderName = styled(TableHeader)`
  width: 50px;
`

const TableHeaderScore = styled(TableHeader)`
  padding-left: 2vw;
  text-align: right;
  position: relative;
  top: 17px;

  @media (min-width: 900px) {
    padding-left: 20vw;
  }
`

const TableCell = styled.td`
  color: var(--dark-gray);
  font-size: 1.3em;
  padding: 0;
  margin: 0;
  line-height: 1.2em;
`

const TableCellMultiRow = styled(TableCell)`
  position: relative;
  top: 20px;
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
`

const GroupShot = styled.img`
  position: relative;
  max-height: 76px;
  transition: all 1s;
  cursor: progress;

  &:hover {
    transform: scale(3);
  }
`

const QuizScoreboardArea = (props) => {
  return (
    <QuizScoreboard>
      <Avatar src={`/static/avatars/${props.avatar}.jpg`} alt={props.avatar} />
      <UserTable>
        <tbody>
          <tr>
            <TableHeaderName>Name:</TableHeaderName>
            <TableCell>{props.name}</TableCell>
            <TableHeaderScore>Score:</TableHeaderScore>
            <TableCellMultiRow rowspan="3"><BigScore>875</BigScore></TableCellMultiRow>
          </tr>
          <tr>
            <TableHeader>Level:</TableHeader>
            <TableCell>{props.level.split('').map((char, i) => (i === 0 || char === 'h') ? char.toUpperCase() : char)}</TableCell>
          </tr>
        </tbody>
      </UserTable>
      <GroupShotWrapper>
        <GroupShot src='/static/graphics/group-seated.png' alt="Group Seated" />
      </GroupShotWrapper>
    </QuizScoreboard>

  )
}

export default QuizScoreboardArea