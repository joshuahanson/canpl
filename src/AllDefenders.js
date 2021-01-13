import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CanvasJSReact from './canvas/canvasjs.react'
import RadarChart from './components/RadarChart'

import {
  renderMinutes,
  renderInterceptions,
  renderTackle,
  renderClearances,
  renderDuelsSeason,
  renderBlocksSeason,
} from './utils/index'

class AllDefenders extends React.Component {
  constructor(props) {
    super(props)
    this.filterDefendersByMin = this.filterDefendersByMin.bind(this)
  }

  renderInterceptionsNinety(data) {
    const interceptsSum = data.reduce((a, b) => ({Int: parseInt(a.Int, 10) + parseInt(b.Int, 10)}))
    const interceptsPerNinety = ((interceptsSum.Int / renderMinutes(data)) * 90).toFixed(2)
    return interceptsPerNinety
  }
  
  renderTacklePerNinety(data) {
    let tacklesSuccess = 0
    data.map(game => {
      tacklesSuccess += parseInt(game.SucflTkls, 10)
    });
    const tacklesPer = ((tacklesSuccess / renderMinutes(data)) * 90).toFixed(2)
    return tacklesPer
  }

  renderBlocksPerNinety(data) {
    let defenseBlocks = 0
    data.map(game => {
      defenseBlocks += parseInt(game.DefensiveBlocks, 10)
    });
    const blocksPer = ((defenseBlocks / renderMinutes(data)) * 90).toFixed(2)
    return blocksPer
  }

  renderRecoveriesPerNinety(data) {
    let recoveries = 0
    data.map(game => {
      recoveries += parseInt(game.Recovery, 10)
    });
    const recovPer = ((recoveries / renderMinutes(data)) * 90).toFixed(2)
    return recovPer
  }

  renderClearancesPerNinety(data) {
    let clearances = 0
    data.map(game => {
      clearances += parseInt(game.Clrnce, 10)
    });
    const clearPer = ((clearances / renderMinutes(data)) * 90).toFixed(2)
    return clearPer
  }

  renderChart(players) {
    // Canvas Chart
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    let playerChartData = []
    let clrvsblks = []
    players.map(player => {
      const getInt = this.renderInterceptionsNinety(player.games)
      const getTck = this.renderTacklePerNinety(player.games)
      const getClear = this.renderClearancesPerNinety(player.games)
      const getBlocks = this.renderBlocksPerNinety(player.games)
    
      playerChartData.push({
        label: player.name,
        x: parseFloat(getInt),
        y: parseFloat(getTck),
        z: parseFloat(getInt) + parseFloat(getTck),
      })

      clrvsblks.push({
        label: player.name,
        x: parseFloat(getClear),
        y: parseFloat(getBlocks),
        z: parseFloat(getClear) + parseFloat(getBlocks),
      })
    })

    const intVsTckOptions = {
			animationEnabled: true,
			exportEnabled: true,
      theme: "dark1", // "light1", "light2", "dark1", "dark2"
			title:{
				text: "CPL Centrebacks: Interceptions vs Tackles per 90",
			fontSize: 26
      },
      // width: 1000,
			axisX: {
				title: "Interceptions per 90",
			logarithmic: true
			},
			axisY: {
				title: "Tackles per 90"
			},
			data: [{
				type: "bubble",
				indexLabel: "{label}",
				toolTipContent: "<b>{label}</b><br>Interceptions/90: {x}<br>Tackles/90: {y}<br>Combined: {z}",
        dataPoints: playerChartData
			}]
    }

    const clrVsBlkOptions = {
			animationEnabled: true,
			exportEnabled: true,
      theme: "dark1", // "light1", "light2", "dark1", "dark2"
			title:{
				text: "CPL Centrebacks: Clearances vs Blocks per 90",
			fontSize: 26
      },
      // width: 1000,
			axisX: {
				title: "Clearances per 90",
			logarithmic: true
			},
			axisY: {
				title: "Blocks per 90"
			},
			data: [{
				type: "bubble",
				indexLabel: "{label}",
				toolTipContent: "<b>{label}</b><br>Clearances/90: {x}<br>Blocks/90: {y}<br>Combined: {z}",
        dataPoints: clrvsblks
			}]
    }

    return (
      <div style={{margin: '5em 0'}}>
        <h1>React Bubble Chart</h1>
        {playerChartData && playerChartData.length > 0 && (
          <React.Fragment>
            <div style={{margin: '2em 0'}}>
              <CanvasJSChart options={intVsTckOptions} />
            </div>
            <div style={{margin: '2em 0'}}>
              <CanvasJSChart options={clrVsBlkOptions} />
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }

  filterDefendersByMin(data, minMinutes) {
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

  renderDefenderData(data) {
    return (
      <React.Fragment>
        {data.map(defender => {
          const gameMins = renderMinutes(defender.games)
          const interCeptionsYear = renderInterceptions(defender.games)
          const clearancesYear = renderClearances(defender.games)
          const duelsSeason = renderDuelsSeason(defender.games)
          const blocksSeason = renderBlocksSeason(defender.games)
          const tacklesSeason = renderTackle(defender.games)
          

          const SIntercepts = this.renderInterceptionsNinety(defender.games)
          const STackles = this.renderTacklePerNinety(defender.games)
          const SBlocks = this.renderBlocksPerNinety(defender.games)
          const SClearances = this.renderClearancesPerNinety(defender.games)
          const SRecoveries = this.renderRecoveriesPerNinety(defender.games)

          const series = [
            {
              name: defender.name,
              data: [
                SIntercepts,
                STackles,
                SClearances,
                SBlocks,
                SRecoveries,
              ],
            },
          ]

          console.log(SIntercepts)

          return (
            <DefenderWrap to={`/player/${defender.playerId}`}>
              <h2>{defender.name} Key Defensive Stats</h2>
              <p>Games: {defender.games.length}</p>
              <p>Minutes: {gameMins}</p>

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
              <hr />
            </DefenderWrap>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const { data } = this.props 
    if (data && data.length > 0) {
      const defenderData = this.filterDefendersByMin(data, 400)
      const defenderList = this.renderDefenderData(defenderData)
      const playerChart = this.renderChart(defenderData)
      return (
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '1em 2em' }}>
            {defenderList}
          </div>
          <div>
            {playerChart}
          </div>
        </section>
      )
    }
    return ''
  }
}

const DefenderWrap = styled(Link)`
  flex: 0 1 45.5%;
  color: inherit;
  text-decoration: none;
`

const GuideContainer = styled.div`
  padding: 1em;
  margin: 1em auto;
  max-width: 1000px;
  ul {
    padding-left: 1.45em;
    li {
      margin-bottom: 1em;
    }
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

export default AllDefenders
