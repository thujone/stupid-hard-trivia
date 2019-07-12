import styled from 'styled-components'
import React, { Component } from 'react'

const QuizScoreboard = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--light-blue);
  margin: auto;
  padding: .5em;
  max-width: 960px;
  width: 100%;
  border: 4px double var(--dark-blue);
  border-radius: 10px;
`

const Avatar = styled.img`
  flex: 1 1 10em;
  max-width: 90px;
  max-height: 90px;
  border: 3px solid var(--dark-blue);
  margin-right: 15px;
`

const UserTable = styled.table`
  flex: 1 1 50em;
`

const TableHeader = styled.th`
  color: var(--dark-blue);
  font-weight: bold;
  font-size: 1.3em;
  text-align: left;
  padding: 0 .5em 0 0;
  line-height: 1.4em;
`

const TableHeaderName = styled(TableHeader)`
  width: 50px;
`

const TableHeaderScore = styled(TableHeader)`
  padding-left: 10vw;
  text-align: right;
`


const TableCell = styled.td`
  color: var(--dark-gray);
  font-size: 1.3em;
  padding: 0;
  margin: 0;
  line-height: 1.4em;
`

const TableCellMultiRow = styled(TableCell)`
  position: relative;
  top: 30px;
`

const Score = styled.span`
  font-family: Erbos;
  color: var(--dark-gray);
`

const BigScore = styled(Score)`
  font-size: 5em;
`

const GroupShotWrapper = styled.div`
  flex: 1 1 10em;
  text-align: right;
`

const GroupShot = styled.img`
  max-height: 86px;
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
            <TableCell>{props.level}</TableCell>
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