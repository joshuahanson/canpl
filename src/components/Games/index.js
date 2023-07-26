import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Card, FlexContainer, Container } from "../../styledComponents";
import { renderTeamLogo, getTeamName } from "../../utils/index";

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: [],
    };
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
    fetch(`/games?year=2022&limit=30`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const niceData = JSON.parse(data);
          this.setGameData(niceData);
          return data;
        }
        return [];
      });
  }

  setGameData(data) {
    const gameIds = [];
    const games = [];
    data.map((item) => {
      const gameExists = gameIds.find((element) => element == item.scatterId);
      if (!gameExists) {
        gameIds.push(item.scatterId);
        const matchedItems = data.filter((x) => x.scatterId == item.scatterId);
        const away = matchedItems.find(
          (element) =>
            element.Away == "true" ||
            element.Away == "TRUE" ||
            element.Away == true
        );
        const home = matchedItems.find(
          (element) =>
            element.Home == "true" ||
            element.Home == "TRUE" ||
            element.Home == true
        );
        const newGame = {
          scatterId: item.scatterId,
          game: item.game,
          Date: item.Date,
          gameId: item.gameId,
          gameStatus: item.gameStatus,
          scatterId: item.scatterId,
          scatterExtra: item.scatterExtra,
          Home: home,
          Away: away,
        };
        games.push(newGame);
      }
    });
    this.setState({ gameData: games });
  }

  renderGameData() {
    const gameData = this.state.gameData;
    return (
      <React.Fragment>
        {gameData &&
          gameData.map((game) => {
            if (game && game.Home && game.Away) {
              return (
                <StyledCard>
                  <p className="game-card--date">{game.scatterExtra}</p>
                  <div className="game-card--line">
                    <TeamImage>
                      <span className="team-image-container">
                        <img src={renderTeamLogo(game.Home.teamFullName)} />
                      </span>
                      <span>{game.Home.Team}</span>
                    </TeamImage>
                    <span className="game-card--goal">{game.Home.Goal}</span>
                    <div className="stat-pills">
                      <span className="stat-pill">
                        <span className="stat-pill-number">
                          {game.Home.ExpG}
                        </span>
                        <span className="game-card--highlight-label">XG</span>
                      </span>
                      <span className="stat-pill">
                        <span className="stat-pill-number">
                          {game.Home.Chance}
                        </span>
                        <span className="stat-pill-label">Chances</span>
                      </span>
                    </div>
                  </div>

                  <div className="game-card--line">
                    <TeamImage>
                      <span className="team-image-container">
                        <img src={renderTeamLogo(game.Away.teamFullName)} />
                      </span>
                      <span>{game.Away.Team}</span>
                    </TeamImage>
                    <span className="game-card--goal">{game.Away.Goal}</span>
                    <div className="stat-pills">
                      <span className="stat-pill">
                        <span className="stat-pill-number">
                          {game.Away.ExpG}
                        </span>
                        <span className="game-card--highlight-label">XG</span>
                      </span>
                      <span className="stat-pill">
                        <span className="stat-pill-number">
                          {game.Away.Chance}
                        </span>
                        <span className="stat-pill-label">Chances</span>
                      </span>
                    </div>
                  </div>

                  <div className="game-card--shot-bar-label">
                    Shots ({game.Home.ShotsTotal} - {game.Away.ShotsTotal})
                  </div>
                  <div className="game-card--shot-bar">
                    <ShotBarTeam
                      style={{ flex: `${game.Home.ShotsTotal}` }}
                      teamName={getTeamName(game.Home.teamShortName)}
                    ></ShotBarTeam>
                    <ShotBarTeam
                      style={{ flex: `${game.Away.ShotsTotal}` }}
                      teamName={getTeamName(game.Away.teamShortName)}
                    ></ShotBarTeam>
                  </div>
                </StyledCard>
              );
            }
          })}
      </React.Fragment>
    );
  }

  render() {
    const gameList = this.renderGameData();
    return (
      <section style={{ marginTop: "2em" }}>
        <h2 className="title">Recent Games</h2>
        <FlexContainer>{gameList}</FlexContainer>
      </section>
    );
  }
}

const StyledCard = styled(Card)`
  color: inherit;
  text-decoration: none;
  padding: 1rem;
  max-width: 318px !important;
  width: 100% !important;
  .game-card--date {
    font-weight: 500;
    font-size: 0.85em;
    color: #353535;
    opacity: 0.5;
    margin: 0;
  }
  .game-card--line {
    display: grid;
    grid-template-columns: 125px 24px 1fr;
    gap: 8px;
    align-items: center;
    margin: 0.75em 0;
  }
  .game-card--goal {
    font-weight: 800;
    text-align: center;
  }
  .game-card--shot-bar {
    display: flex;
    height: 5px;
    background: #ffffff;
    border: 1px solid rgba(240, 240, 240, 0.6);
    border-radius: 2px;
  }
  .game-card--shot-bar-label {
    font-weight: 400;
    font-size: 0.75em;
    margin-top: 1em;
    margin-bottom: 0.45em;
    color: var(--black);
    opacity: 0.5;
  }
`;

const ShotBarTeam = styled.div`
  background: var(--${(props) => props.teamName});
  &:first-child {
    border-right: 2.5px solid #fff;
  }
  &:last-child {
    border-left: 2.5px solid #fff;
  }
`;

const TeamImage = styled.div`
  display: flex;
  align-items: center;
  .team-image-container {
    width: 20px;
    text-align: center;
    margin-right: 0.5em;
    img {
      max-width: 20px;
      height: 20px;
    }
  }
`;

export default Games;
