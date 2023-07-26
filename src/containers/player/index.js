import React from "react";
import styled from "styled-components";

import {
  renderInterceptions,
  renderTackle,
  renderClearances,
  renderDuelsSeason,
  renderBlocksSeason,
  returnInterceptionsNinety,
  returnTacklePerNinety,
  returnBlocksPerNinety,
  returnRecoveriesPerNinety,
  returnDefTouchesPerNinety,
  returnClearancesPerNinety,
  renderTeamLogo,
} from "../../utils/index";

// import RadarChart from "../../components/RadarChart";

import { Card } from "../../styledComponents";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [],
      playerDataByGame: [],
      playerDataBySeason: [],
    };
    this.updatePlayerData = this.updatePlayerData.bind(this);
    this.maintainPlayerState = this.maintainPlayerState.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;
    this.maintainPlayerState();
    this.getPlayerByGames(id);
    this.getPlayerBySeason(id);
  }

  componentDidUpdate() {
    this.maintainPlayerState();
  }

  componentWillUnmount() {
    this.setState({ playerData: "" });
  }

  maintainPlayerState() {
    const { players } = this.props;
    const playerData = this.state.playerData;

    if (playerData.length < 1 && players.length > 0) {
      this.updatePlayerData(players);
    }
  }

  updatePlayerData(data) {
    const { match } = this.props;
    const matchingPlayer = data.filter(
      (item) => item.optaPersonId === match.params.id
    )[0];
    if (matchingPlayer) {
      this.setState({ playerData: matchingPlayer });
    }
  }

  getPlayerByGames(id) {
    fetch(`/player-games?id=${id}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const dataJson = JSON.parse(data);
          const filteredData = dataJson.filter(function (games) {
            return games.length;
          });
          this.setState({ playerDataByGame: filteredData });
          return data;
        }
        return [];
      });
  }

  getPlayerBySeason(id) {
    fetch(`/player-totals?id=${id}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const dataJson = JSON.parse(data);
          const filteredData = dataJson.filter(function (season) {
            return !!season;
          });
          this.setState({ playerDataBySeason: filteredData });
          return data;
        }
        return [];
      });
  }

  renderPlayerData() {
    const playerDataByGame = this.state.playerDataByGame;
    const recentGamesAll =
      playerDataByGame.length > 0 &&
      playerDataByGame[playerDataByGame.length - 1];
    const playerDataBySeason = this.state.playerDataBySeason;
    const recentSeasonAll =
      playerDataBySeason.length > 0 &&
      playerDataBySeason[playerDataBySeason.length - 1];
    const playerName = recentSeasonAll.playerFullName;
    const playerTeam = recentSeasonAll.teamName;
    const playerPosition = recentSeasonAll.pos;

    // Offensive
    const goals = recentSeasonAll.Goal;
    console.log(recentSeasonAll);

    // Defensive Stats
    const interCeptionsYear = renderInterceptions(recentGamesAll);
    const clearancesYear = renderClearances(recentGamesAll);
    const duelsSeason = renderDuelsSeason(recentGamesAll);
    const blocksSeason = renderBlocksSeason(recentGamesAll);
    const tacklesSeason = renderTackle(recentGamesAll);

    return (
      <PlayerPage>
        <PlayerContainer>
          <PlayerTitle data={{ playerTeam, playerName, playerPosition }} />

          <HighlightGrid>
            <div>
              <h3>Offensive Highlights</h3>
              <Card style={{ margin: "1em 0" }}>
                <FlexRow>
                  <FlexColHalf>
                    <h3>Goals</h3>
                    {goals}
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
              </Card>
            </div>
            <div>
              <h3>Defensive Highlights</h3>
              <Card style={{ margin: "1em 0" }}>
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
              </Card>
            </div>
          </HighlightGrid>

          <CurrentSeasonTable data={recentGamesAll} />

          <PreviousSeasonTable data={playerDataBySeason} />

          {/* {this.renderRadarChart()} */}
        </PlayerContainer>
      </PlayerPage>
    );
  }

  // renderRadarChart() {
  //   const playerDataBySeason = this.state.playerDataBySeason;
  //   const recentSeasonAll =
  //     playerDataBySeason.length > 0 &&
  //     playerDataBySeason[playerDataBySeason.length - 1];
  //   const previousSeasonAll =
  //     playerDataBySeason.length > 0 &&
  //     playerDataBySeason[playerDataBySeason.length - 2];
  //   const radarData = {
  //     labels: [
  //       "Goals",
  //       "Assists",
  //       "Open Play xG",
  //       "Big Chances Created",
  //       "Testing",
  //     ],
  //     datasets: [
  //       {
  //         label: "Current Season",
  //         data: [
  //           recentSeasonAll.Goal,
  //           recentSeasonAll.Ast,
  //           recentSeasonAll.OpenPlayxG,
  //           recentSeasonAll.BgChncCrtd,
  //           recentSeasonAll.BgChncCrtd,
  //         ],
  //         fill: true,
  //         backgroundColor: "rgba(255, 99, 132, 0.2)",
  //         borderColor: "rgb(255, 99, 132)",
  //         pointBackgroundColor: "rgb(255, 99, 132)",
  //         pointBorderColor: "#fff",
  //         pointHoverBackgroundColor: "#fff",
  //         pointHoverBorderColor: "rgb(255, 99, 132)",
  //       },
  //       {
  //         label: "Previous Season",
  //         data: [
  //           previousSeasonAll && previousSeasonAll.Goal,
  //           previousSeasonAll && previousSeasonAll.Ast,
  //           previousSeasonAll && previousSeasonAll.OpenPlayxG,
  //           previousSeasonAll && previousSeasonAll.BgChncCrtd,
  //           previousSeasonAll && previousSeasonAll.BgChncCrtd,
  //         ],
  //         fill: true,
  //         backgroundColor: "rgba(54, 162, 235, 0.2)",
  //         borderColor: "rgb(54, 162, 235)",
  //         pointBackgroundColor: "rgb(54, 162, 235)",
  //         pointBorderColor: "#fff",
  //         pointHoverBackgroundColor: "#fff",
  //         pointHoverBorderColor: "rgb(54, 162, 235)",
  //       },
  //     ],
  //   };

  //   return <RadarChart data={radarData} />;
  // }

  render() {
    return this.renderPlayerData();
  }
}
const PlayerTitle = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1em",
        marginBottom: "3em",
      }}
    >
      <img
        style={{ maxWidth: "30px", marginRight: "1rem" }}
        src={renderTeamLogo(data.playerTeam)}
      />
      <div>
        <h2 style={{ marginBottom: 0 }}>{data.playerName} </h2>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>
          {data.playerTeam}
          <span
            style={{
              fontWeight: "400",
              fontSize: "1.015em",
              color: "#353535",
              opacity: "0.5",
              marginLeft: "0.5rem",
            }}
          >
            {data.playerPosition}
          </span>
        </h3>
      </div>
    </div>
  );
};

const CurrentSeasonTable = ({ data }) => {
  const content = data ? (
    <>
      <div>
        <h3>Current Season</h3>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Game</th>
                <th>Position</th>
                <th>Mins</th>
                <th>Touches</th>
                <th>
                  Tackles <span className="emoji">✅</span>
                </th>
                <th>
                  Tackles <span className="emoji">❌</span>
                </th>
                <th>
                  Duels <span className="emoji">✅</span>
                </th>
                <th>
                  Duels <span className="emoji">❌</span>
                </th>
                <th>TchsD3</th>
                <th>TchsM3</th>
                <th>TchsA3</th>
              </tr>
            </thead>
            <tbody>
              {data.map((game) => {
                return (
                  <tr key={game.scatterExtra} style={{ position: "relative" }}>
                    <td>{game.scatterExtra}</td>
                    <td>{game.Position}</td>
                    <td>{game.Min}</td>
                    <td>{game.Touches}</td>
                    <td>{game.SucflTkls}</td>
                    <td>{game.FailTackle}</td>
                    <td>{game.SucflDuels}</td>
                    <td>{game.DuelLs}</td>
                    <td>{game.TchsD3}</td>
                    <td>{game.TchsM3}</td>
                    <td>{game.TchsA3}</td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </div>
    </>
  ) : (
    <div></div>
  );
  return content;
};

const PreviousSeasonTable = ({ data }) => {
  const seasons = data.filter((season) => season != null);
  if (seasons && seasons.length > 1) {
    return (
      <>
        <br />
        <hr />
        <br />
        <div>
          <h3>Previous Seasons</h3>

          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Position</th>
                  <th>Games</th>
                  <th>Mins</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Shots</th>
                  <th>Open Play xG</th>
                  <th>Pass Suc %</th>
                  <th>Pass Fwd %</th>
                  <th>Touch Op Box</th>
                  <th>Turnover</th>
                  <th>Dribbles</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .reverse()
                  .slice(1, data.length)
                  .filter((season) => season != null)
                  .map((season) => (
                    <tr
                      key={`${season.Min}-${season.teamName}`}
                      style={{ position: "relative" }}
                    >
                      <td>{season.teamName}</td>
                      <td>{season.Position}</td>
                      <td>{season.GM}</td>
                      <td>{season.Min}</td>
                      <td>{season.Goal}</td>
                      <td>{season.Ast}</td>
                      <td>{season.ShotsTotal}</td>
                      <td>{season.OpenPlayxG}</td>
                      <td>{season.PassSucPct}</td>
                      <td>{season.PctPassFwd}</td>
                      <td>{season.TouchOpBox}</td>
                      <td>{season.Turnover}</td>
                      <td>{season.Success1v1}</td>
                    </tr>
                  ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </div>
        <br />
        <hr />
        <br />
      </>
    );
  } else {
    return <div></div>;
  }
};

const TableWrapper = styled.div`
  overflow-x: scroll;
`;

const StyledTable = styled.table`
  border: #999;
  width: 100%;
  width: max-content;
  border-spacing: 0;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    padding: 0.5em;
    border-right: 1px solid var(--black);
    background: #fff;
  }
  tr {
    position: relative;
    border: 1px solid var(--black);
  }
  tr:nth-child(even) td {
    background: #fefefe;
  }
  tr:first-of-type th {
    background: var(--black);
    color: #fff;
  }
`;

const PlayerPage = styled.article`
  ${"" /* background: #f2f2f2; */}
`;

const PlayerContainer = styled.div`
  padding: 2em 1em;
  margin: 0 auto;
  max-width: 1000px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FlexColHalf = styled.div`
  max-width: 45%;
  flex: 0 1 45%;
`;

const HighlightGrid = styled.div`
  @media screen and (min-width: 768px) {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
  }
`;

export default Player;
