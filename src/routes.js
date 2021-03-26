import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Forge from './containers/teams/forge'
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
      fullPlayerData: [],
    }
    this.updateTeamData = this.updateTeamData.bind(this)
    this.createFullPlayerData = this.createFullPlayerData.bind(this)
  }

  componentDidMount() {
    this.updateTeamData(games)
    this.createFullPlayerData(playersByGame, playersBySeason)
  }

  updateTeamData(result) {
    const data = result
    this.setState({ gameData: data })
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
      this.setState({ fullPlayerData: sortedPlayersArray })
    }
  }

  render() {
    const fullPlayerData = this.state.fullPlayerData
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
          render={(props) => <HomeNew {...props} allPlayers={fullPlayerData} />}
        />
        <Route 
          exact
          path="/player/:id"
          render={(props) => <DefensivePlayer {...props} players={fullPlayerData} />}
        />
        <Route
          exact
          path="/teams/forge"
          render={(props) => <Forge {...props} />}
        />
        <Route component={Footer} />
      </Router>
    )
  }
}

export default Routes