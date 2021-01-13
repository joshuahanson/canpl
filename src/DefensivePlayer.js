import React from 'react'
import styled from 'styled-components'
import {
  renderMinutes,
  renderInterceptions,
  renderTackle,
  renderClearances,
  renderDuelsSeason,
  renderBlocksSeason,
} from './utils/index'

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
    console.log(`${match.params.id}`)
    data.map(game => {
      if (match.params.id === game.playerId) {
        playerList.push(game)
      }
    })
    playerList.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    console.log(playerList)
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

      return (
        <GuideContainer>
          <h2>{playerName} Key Defensive Stats</h2>
          <p>Games: {data.length}</p>
          <p>Minutes: {gameMins}</p>
        
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

        </GuideContainer>
      )
    }
    return ''
  }
}

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

export default DefensivePlayer
