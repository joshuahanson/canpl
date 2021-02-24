import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Home from './Home';
import HomeNew from './HomeNew';
import DefensivePlayer from './DefensivePlayer';
import playersByGame from './playersByGame'
import playersBySeason from './playersBySeason'
import games from './games'

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameData: [],
      playerGameData: [],
      playerSeasonData: [],
    }
    this.updateTeamData = this.updateTeamData.bind(this)
    this.updatePlayerData = this.updatePlayerData.bind(this)
    this.updatePlayerSeasonData = this.updatePlayerSeasonData.bind(this)
  }

  componentDidMount() {
    this.updateTeamData(games)
    this.updatePlayerData(playersByGame)
    this.updatePlayerSeasonData(playersBySeason)
  }

  updateTeamData(result) {
    const data = result
    this.setState({ gameData: data })
  }

  updatePlayerData(result) {
    const data = result
    data.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    this.setState({ playerGameData: data })
  }

  updatePlayerSeasonData(result) {
    const data = result
    data.sort((d1, d2) => d1.lastName.localeCompare(d2.lastName))
    this.setState({ playerSeasonData: data })
  }

  createFullPlayerData(games, season) {
    let sortedPlayersArray = []
    
    if(games && games.length > 0 && season && season.length > 0) {

      season.map(player => {
        const playerID = player.optaPersonId
        const playerGames = games.filter(item => item.optaPersonId === playerID)
        const playerFormatted = {
          ...player,
          games: playerGames
        }
        sortedPlayersArray.push(playerFormatted)
      })
      return sortedPlayersArray
    }
  }

  render() {
    const playerGameData = this.state.playerGameData
    const playerSeasonData = this.state.playerSeasonData
    const fullPlayerData = this.createFullPlayerData(playerGameData, playerSeasonData)
    console.log(fullPlayerData)
    return (
      <Router>
        <Route component={Nav} />
        {/* <Route 
          exact
          path="/"
          render={(props) => <Home {...props} allPlayers={playerGameData} />}
        /> */}
        <Route 
          exact
          path="/"
          render={(props) => <HomeNew {...props} seasonData={playerSeasonData} allPlayers={playerGameData} />}
        />
        <Route 
          exact
          path="/player/:id"
          render={(props) => <DefensivePlayer {...props} players={playerGameData} />}
        /> 
        <Route component={Footer} />
      </Router>
    )
  }
}

export default Routes