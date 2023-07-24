import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Forge from "./containers/teams/forge";
import Home from "./containers/home";
import Player from "./containers/player";

// import playersByGame from "./data/playersByGame.json";
// import playersBySeason from "./data/playersBySeason.json";
// import games from "./data/games.json";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: [],
      fullPlayerData: [],
    };
  }

  render() {
    const fullPlayerData = this.state.fullPlayerData;
    return (
      <Router>
        <Route component={Nav} />
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} allPlayers={fullPlayerData} />}
        />
        <Route
          exact
          path="/player/:id"
          render={(props) => <Player {...props} players={fullPlayerData} />}
        />
        <Route
          exact
          path="/teams/forge"
          render={(props) => <Forge {...props} />}
        />
        <Route component={Footer} />
      </Router>
    );
  }
}

export default Routes;
