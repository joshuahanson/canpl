import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Card, FlexContainer } from "../../styledComponents";
import { renderTeamLogo, getTeamName } from "../../utils/index";

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPlayerData: [],
    };
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers() {
    fetch(`http://localhost:3001/players?year=2022&limit=222200`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data && data.length > 0) {
          this.setState({ allPlayerData: JSON.parse(data) });
          return data;
        }
        return [];
      });
  }

  renderPlayerData() {
    const allPlayerData = this.state.allPlayerData;
    // const filteredPlayerData = _.filter(allPlayerData, { lastSeason: "2022" });
    const orderedPlayerData = _.orderBy(
      allPlayerData,
      ["Goals", "GA", "Ast", "teamName"],
      ["desc", "desc", "desc", "asc"]
    );

    return (
      <React.Fragment>
        {orderedPlayerData &&
          orderedPlayerData.slice(0, 6000).map((player) => {
            const currentSeason = player.season[player.season.length - 1];
            return (
              <StyledCard team={getTeamName(player.teamShortName)}>
                <div className="card-header">
                  <PlayerImage>
                    <img src={renderTeamLogo(player.teamName)} />
                  </PlayerImage>
                  <div>
                    <h2 className="mb-0">
                      <Link to={`/player/${player.optaPersonId}`}>
                        {player.Player}
                      </Link>
                    </h2>
                    <div className="player-team">
                      <h3>{player.teamName}</h3>
                      <p> {player.Position}</p>
                    </div>
                  </div>
                </div>
                <h4
                  style={{
                    marginTop: "1em",
                    marginBottom: "1em",
                    fontSize: "0.9em",
                  }}
                >
                  Current Season
                </h4>
                <div className="stat-pills">
                  <span className="stat-pill">
                    <span className="stat-pill-number">{player.Goal}</span>
                    <span className="stat-pill-label">Goals</span>
                  </span>
                  <span className="stat-pill">
                    <span className="stat-pill-number">
                      {currentSeason.ExpG}
                    </span>
                    <span className="stat-pill-label">xG</span>
                  </span>

                  <span className="stat-pill">
                    <span className="stat-pill-number">{player.Ast}</span>
                    <span className="stat-pill-label">Assists</span>
                  </span>
                  <span className="stat-pill">
                    <span className="stat-pill-number">
                      {currentSeason.ExpA}
                    </span>
                    <span className="stat-pill-label">xA</span>
                  </span>

                  <span className="stat-pill">
                    <span className="stat-pill-number">{player.GM}</span>
                    <span className="stat-pill-label">Games</span>
                  </span>
                  <span className="stat-pill">
                    <span className="stat-pill-number">
                      {currentSeason.PassSucPct}
                    </span>
                    <span className="stat-pill-label">Pass</span>
                  </span>
                  <span className="stat-pill">
                    <span className="stat-pill-number">{player.Min}</span>
                    <span className="stat-pill-label">Minutes</span>
                  </span>
                  <span className="stat-pill">
                    <span className="stat-pill-number">
                      {currentSeason.SucflTkls}
                    </span>
                    <span className="stat-pill-label">Tackles</span>
                  </span>
                  <span className="stat-pill">
                    <span className="stat-pill-number">
                      {currentSeason.Turnover}
                    </span>
                    <span className="stat-pill-label">Turnovers</span>
                  </span>
                </div>
                <div style={{ marginTop: "1em" }}>
                  <Link className="btn" to={`/player/${player.optaPersonId}`}>
                    See More
                  </Link>
                </div>
              </StyledCard>
            );
          })}
      </React.Fragment>
    );
  }

  render() {
    const playerList = this.renderPlayerData();
    return (
      <section className="mb-4" style={{ marginBottom: "4em" }}>
        <h2 className="title">Top Players</h2>
        <FlexContainer>{playerList}</FlexContainer>
      </section>
    );
  }
}

const StyledCard = styled(Card)`
  display: block;
  padding: 1rem;
  max-width: 318px !important;
  width: 100% !important;
  h2 a {
    text-decoration: none;
    color: inherit;
  }
  .card-header {
    display: flex;
    align-items: center;
    h2,
    h3,
    p {
      margin: 0;
    }
    h2 {
      font-size: 1.625em;
    }
    h3 {
      font-size: 1.015em;
      font-weight: bold;
    }
    p {
      font-weight: 400;
      font-size: 1.015em;
      color: #353535;
      opacity: 0.5;
    }
    .player-team {
      display: flex;
      align-items: center;
      h3 {
        margin-right: 0.5em;
      }
    }
  }
  .quick-stats {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px;
    div {
      display: flex;
      align-items: baseline;
    }
    h2 {
      font-size: 2.25em;
      margin: 0;
      z-index: 1;
    }
    p {
      margin: 0;
      margin-left: -0.35em;
      padding: 2px 2px 3px 4px;
      background: #e4e5e5;
      font-size: 0.8125em;
      font-weight: 600;
      transform: translateY(-4px);
      border-bottom: 3px solid var(--cpl-green);
      border-color: ${(props) =>
        props.team ? `var(--${props.team})` : "var(--cpl-green)"};
    }
  }
`;

const PlayerImage = styled.div`
  margin-right: 1em;
  text-align: center;
  max-width: 50px;

  img {
    height: 50px;
  }
`;

export default Players;
