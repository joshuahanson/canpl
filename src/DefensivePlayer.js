import React from 'react'
import styled from 'styled-components'
import RadarChart from './components/RadarChart'
import {
  renderMinutes,
  renderInterceptions,
  renderTackle,
  renderClearances,
  renderDuelsSeason,
  renderBlocksSeason,
  returnInterceptionsNinety,
  returnTacklePerNinety,
  returnBlocksPerNinety,
  returnRecoveriesPerNinety,
  returnClearancesPerNinety,
} from './utils/index'

import { Card } from './styledComponents'

class DefensivePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerData: [],
    }
    this.updatePlayerData = this.updatePlayerData.bind(this)
    this.maintainPlayerState = this.maintainPlayerState.bind(this)
  }
  
  componentDidMount() {
    this.maintainPlayerState()
  }

  componentDidUpdate() {
    this.maintainPlayerState()
  }

  componentWillUnmount() {
    this.setState({ playerData: '' })
  }

  maintainPlayerState() {
    const { players } = this.props
    const playerData = this.state.playerData

    if(playerData.length < 1 && players.length > 0) {
      this.updatePlayerData(players)
    }
  }

  updatePlayerData(data) {
    const { match } = this.props
    let playerList = []
    data.map(game => {
      if (match.params.id === game.playerId) {
        playerList.push(game)
      }
    })
    playerList.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    this.setState({ playerData: playerList })
  }

  render() {
    const data = this.state.playerData
    if (data && data.length > 0) {
      const playerName = data[0].player
      const gameMins = renderMinutes(data)
      const interCeptionsYear = renderInterceptions(data)
      const clearancesYear = renderClearances(data)
      const duelsSeason = renderDuelsSeason(data)
      const blocksSeason = renderBlocksSeason(data)
      const tacklesSeason = renderTackle(data)
      const playerAge = data[0].Age
      const playerTeam = data[0].team

      const SIntercepts = returnInterceptionsNinety(data)
      const STackles = returnTacklePerNinety(data)
      const SBlocks = returnBlocksPerNinety(data)
      const SClearances = returnClearancesPerNinety(data)
      const SRecoveries = returnRecoveriesPerNinety(data)


      const series = [
        {
          name: playerName,
          data: [
            SIntercepts,
            STackles,
            SClearances,
            SBlocks,
            SRecoveries,
          ],
        },
      ]

      return (
        <PlayerPage>
          <PlayerContainer>
            <Card>
              <h2>{playerName}</h2>
              <p>Games: {data.length}</p>
              <p>Minutes: {gameMins}</p>
              <p>Age: {playerAge}</p>
              <p>Team: {playerTeam}</p>
              <RadarChart series={series} />
              <FlexRow>
                <FlexColHalf>
                  <h3>Tackles Season</h3>
                  {tacklesSeason}
                </FlexColHalf>
                <FlexColHalf>
                  <h3>Interceptions Season</h3>
                  {interCeptionsYear}
                </FlexColHalf>
              </FlexRow>

              <FlexRow>
                <FlexColHalf>
                  <h3>Clearances Season</h3>
                  {clearancesYear}
                </FlexColHalf>
                <FlexColHalf>
                  <h3>Duels by Season</h3>
                  {duelsSeason}
                </FlexColHalf>
              </FlexRow>

              <FlexRow>
                <FlexColHalf>
                  <h3>Blocks by Season</h3>
                  {blocksSeason}
                </FlexColHalf>
              </FlexRow>

              {/*  */}
              <div>
                <h4>Defending</h4>
                <TableWrapper>
                  <StyledTable>
                    <tr>
                      <th>Game</th>
                      <th>Position</th>
                      <th>Mins</th>
                      <th>Touches</th>
                      <th>
                        Tackles {' '}
                        <span className="emoji">✅</span>
                      </th>
                      <th>
                        Tackles {' '}
                        <span className="emoji">❌</span>
                      </th>
                      <th>
                        Duels {' '}
                        <span className="emoji">✅</span>
                      </th>
                      <th>
                        Duels {' '}
                        <span className="emoji">❌</span>
                      </th>
                      <th>TchsD3</th>
                      <th>TchsM3</th>
                      <th>TchsA3</th>
                    </tr>
                    {data.map(game => {
                      return (
                        <tr style={{position: 'relative'}}>
                          <td>
                            {game.scatterExtra}
                          </td>
                          <td>
                            {game.Position}
                          </td>
                          <td>
                            {game.Min}
                          </td>
                          <td>
                            {game.Touches}
                          </td>
                          <td>
                            {game.SucflTkls}
                          </td>
                          <td>
                            {game.FailTackle}
                          </td>
                          <td>
                            {game.SucflDuels}
                          </td>
                          <td>
                            {game.DuelLs}  
                          </td>
                          <td>
                            {game.TchsD3}
                          </td>
                          <td>
                            {game.TchsM3}
                          </td>
                          <td>
                            {game.TchsA3}
                          </td>
                        </tr>
                      )
                    })}
                  </StyledTable>
                </TableWrapper>
              </div>
            </Card>
          </PlayerContainer>
        </PlayerPage>
      )
    }
    return ''
  }
}

const TableWrapper =styled.div`
  overflow-x: scroll;
`

const StyledTable = styled.table`
  background: #f2f2f2;
  border: #999;
  width: 100%;
  width: max-content;
  border-spacing: 0;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    padding: 0.5em;
    border-right: 1px solid black;
    background: #f2f2f2;
  }
  tr {
    position: relative;
    border: 1px solid black;
  }
  &.float-title {
    th,
    td {
      &:first-of-type {
        position: absolute;
        width: 175px;
        font-size: 14px;
        border: 1px solid black;
        margin: 0px 0 0;
        padding: 8px 0.5em;
        margin-top: -1px;
        height: 20px;
      }
    }
  }
`

const PlayerPage = styled.article`
  background: #f2f2f2;
`

const PlayerContainer = styled.div`
  padding: 2em 1em;
  margin: 1em auto;
  max-width: 800px;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const FlexColHalf = styled.div`
  max-width: 45%;
  flex: 0 1 45%;
`

export default DefensivePlayer
