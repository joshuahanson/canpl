import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CanvasJSReact from './canvas/canvasjs.react'
import RadarChart from './components/RadarChart'
import { Card, FlexContainer } from './styledComponents'
// import marco from './assets/marco.png'
import profileIcon from './assets/blank-icon.png'

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
  redCardsSeason,
  yellowCardsSeason,
  goalsSeason,
  assistsSeason,
} from './utils/index'

class AllPlayers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
    }
    this.filterPlayersByMin = this.filterPlayersByMin.bind(this)
  }

  sortPlayers(data) {
    const { location, sortedBy } = this.props
    if (data && data.length > 0) {
      const sortQ = new URLSearchParams(location.search).get('sort')
      if (sortedBy === 'Minutes' || sortQ === 'Minutes') {
        return _.sortBy(data, ['mins']).reverse()
      }
      if (sortedBy === 'Games' || sortQ === 'Games') {
        return _.sortBy(data, ['games']).reverse()
      }
      if (sortedBy === 'Alphabetical' || sortQ === 'Alphabetical') {
        return _.sortBy(data, ['name'])
      }
      return data
    }
  }

  filterPlayersByMin(data, minMinutes) {
    let sortedPlayersArray = []
    data.map(game => {
      const currentPlayerId = game.playerId
      const playerExistsInNew = _.find(sortedPlayersArray, ['playerId', currentPlayerId])
      if (!playerExistsInNew) {
        const playerGames = data.filter(item => item.playerId === currentPlayerId)
        const playerMins = renderMinutes([...playerGames])
        if (minMinutes) { 
          if(playerMins >= minMinutes) {
            sortedPlayersArray.push(
              {
                playerId: currentPlayerId,
                name: game.player,
                games: [...playerGames],
                mins: playerMins
              },
            )
          }
        } else {
          sortedPlayersArray.push(
            {
              playerId: currentPlayerId,
              name: game.player,
              games: [...playerGames],
              mins: playerMins
            },
          )
        }
      }
    })
    return sortedPlayersArray
  }

  renderRadar(data) {
    const SIntercepts = returnInterceptionsNinety(data.games)
    const STackles = returnTacklePerNinety(data.games)
    const SBlocks = returnBlocksPerNinety(data.games)
    const SClearances = returnClearancesPerNinety(data.games)
    const SRecoveries = returnRecoveriesPerNinety(data.games)
    const playerSeries = [
      {
        name: data.name,
        data: [
          SIntercepts,
          STackles,
          SClearances,
          SBlocks,
          SRecoveries,
        ],
      },
    ]
    return <RadarChart series={playerSeries} />
  }

  renderPlayerData(data) {
    return (
      <React.Fragment>
        {data.map(player => {
          const gameMins = renderMinutes(player.games)
          const interCeptionsYear = renderInterceptions(player.games)
          const clearancesYear = renderClearances(player.games)
          const duelsSeason = renderDuelsSeason(player.games)
          const blocksSeason = renderBlocksSeason(player.games)
          const tacklesSeason = renderTackle(player.games)
          const redsSeason = redCardsSeason(player.games)
          const yellowsSeason = yellowCardsSeason(player.games)
          const goalsPerSeason = goalsSeason(player.games)
          const assistsPerSeason= assistsSeason(player.games)
          {/* const radarChart = this.renderRadar(player) */}

          return (
            <PlayerWrap>
              <StyledCard>
                <PlayerImage>
                  <img src={profileIcon} />
                </PlayerImage>
                <h2>
                  <Link to={`/player/${player.playerId}`}>
                    {player.name} 
                  </Link>
                </h2>
                <FlexRow style={{justifyContent: 'space-evenly'}}>
                  <p>
                    <strong>Games: </strong>
                    {player.games.length}
                  </p>
                  <p>
                    <strong>Minutes: </strong>
                    {gameMins}
                  </p>
                  <p>
                    <strong>Goals: </strong> 
                    {goalsPerSeason}
                  </p>
                  <p>
                    <strong>Assists: </strong> 
                    {assistsPerSeason}
                  </p>
                  <p>
                    <strong>Reds: </strong>
                    {redsSeason}
                  </p>
                  <p>
                    <strong>Yellows: </strong>
                    {yellowsSeason}
                  </p>
                {/* {radarChart} */}
                </FlexRow>
                <FlexRow>
                  <FlexColHalf>
                    <h3>Tackles Season</h3>
                    {tacklesSeason}
                  </FlexColHalf>
                  <FlexColHalf>
                  <h3>Interceptions Season</h3>
                  {interCeptionsYear}
                  </FlexColHalf>
                
                  <FlexColHalf>
                    <h3>Clearances Season</h3>
                    {clearancesYear}
                  </FlexColHalf>
                  <FlexColHalf>
                    <h3>Duels by Season</h3>
                    {duelsSeason}
                  </FlexColHalf>
                
                  <FlexColHalf>
                    <h3>Blocks by Season</h3>
                    {blocksSeason}
                  </FlexColHalf>
                </FlexRow>
              </StyledCard>
            </PlayerWrap>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const { data } = this.props 
    const players = this.state.players
    if (data && data.length > 0) {
      const playerData = this.filterPlayersByMin(data, 270)
      const sortedData = this.sortPlayers(playerData)
      const playerList = this.renderPlayerData(sortedData)
      return (
        <section>
          <FlexContainer>
            {playerList}
          </FlexContainer>
        </section>
      )
    }
    return ''
  }
}

const StyledCard = styled(Card)`
  padding: 2em 1em;

  h2 {
    margin-top: 0;
    text-align: center;
  }
`

const PlayerImage = styled.div`
  border-radius: 50%;
  border: 1px solid var(--black);
  width: 100px;
  height: 100px;
  margin: 0 auto 1em;
  overflow: hidden;
  text-align: center;

  img {
    ${'' /* width: 110%;
    transform: translate(-5%, -5%); */}
    width: 60%;
    transform: translateY(25%);
  }
`

const PlayerWrap = styled.div`
  margin: 1em 0;
  color: inherit;
  text-decoration: none;
  flex: 1 1 100%;
  @media(min-width: 650px) {
    flex: 0 1 48%;
    flex: 0 1 calc(50% - 1em);
  }

  h2 a {
    text-decoration: none;
    color: inherit;
  }
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

export default AllPlayers
