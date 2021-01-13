import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CSVParse from 'papaparse'
import './index.css';
import Footer from './components/Footer'
import Nav from './components/Nav'
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import DefensivePlayer from './DefensivePlayer';

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameData: [],
      defenderData: [],
      allPlayerData: [],
    }
    this.updateTeamData = this.updateTeamData.bind(this)
    this.updatePlayerData = this.updatePlayerData.bind(this)
  }

  componentDidMount() {
    // var cplData = require("./CPL-Team-By-Game-2020.csv");
    var playerData = require("./CPL-Player-By-Game-2020.csv");

    // CSVParse.parse(cplData, {
    //   header: true,
    //   download: true,
    //   skipEmptyLines: true,
    //   complete: this.updateTeamData,
    // });

    CSVParse.parse(playerData, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updatePlayerData,
    });
  }

  updateTeamData(result) {
    const data = result.data
    this.setState({ gameData: data })
  }

  updatePlayerData(result) {
    const data = result.data
    let defenderList = []
    data.map(game => {
      if (
        game.Position.includes("Centre Back") ||
        game.Position.includes("Central Defender")        
      ) {
        defenderList.push(game)
      }
    })
    
    data.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    defenderList.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())

    this.setState({ allPlayerData: data })
    this.setState({ defenderData: defenderList })
  }

  render() {
    const defenderData = this.state.defenderData
    const allPlayerData = this.state.allPlayerData
    return (
      <main>
        <Router>
          <Route component={Nav} />
          <Route 
            exact
            path="/"
            render={(props) => <Home {...props} defenders={defenderData} />}
          />
          <Route 
            exact
            path="/player/:id"
            render={(props) => <DefensivePlayer {...props} players={allPlayerData} />}
          /> 
          <Route component={Footer} />
        </Router>
      </main>
    )
  }
}

export default Routes