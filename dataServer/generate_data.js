const fse = require("fs-extra");
const fs = require("fs");
const csv = require("csvtojson");
const utils = require("./utils");

const processCSVs = () => {
  utils.allFilesArray.map((item) => {
    csv()
      .fromFile(`raw_data/${item}.csv`)
      .then((jsonObj) => {
        fse
          .outputFile(`raw_output/${item}.json`, JSON.stringify(jsonObj))
          .then(() => {
            console.log("The file has been saved!");
          })
          .catch((err) => {
            console.error(err);
          });
      });
  });
};

const processPlayerIds = () => {
  // Create empty array `playerArray` to store player IDs
  // Loop through playerBySeasonFiles and grab every optaPersonId
  // add this ID to `playerArray`, if ID already exists in array skip
  // this will create a list of all player IDs so we can easily make a list of all players
  let playerArray = [];
  utils.playerBySeasonFiles.map((item) => {
    const matchedFile = require(`./raw_output/${item}.json`);
    return matchedFile.filter((x) => {
      if (!playerArray.includes(x.optaPersonId)) {
        playerArray.push(x.optaPersonId);
      }
    });
  });
  fse
    .outputFile(`raw_output/player_ids.json`, JSON.stringify(playerArray))
    .then(() => {
      console.log("The file has been saved!");
    })
    .catch((err) => {
      console.error(err);
    });
  return playerArray;
};

const groupPlayerData = () => {
  // {
  //   optaPersonId: "abc1234",
  //   seasons: [{},...],
  //   games: [[{"season1game1"},{"season1game2"}], [{"season2game1"}]]
  // }
  // loop through player_ids - grab the array list for the games
  //
  let allPlayers = [];
  const playerFile = require(`./raw_output/player_ids.json`);
  playerFile.map((item) => {
    // playerFile.map((item) => {
    let season = [];
    let games = [];
    utils.playerBySeasonFiles.map((file) => {
      const matchedFile = require(`./raw_output/${file}.json`);
      return matchedFile.filter((x) => {
        if (x.optaPersonId == item) {
          season.push(x);
        }
      });
    });
    utils.playerByGameFiles.map((file) => {
      const matchedFile = require(`./raw_output/${file}.json`);
      return matchedFile.filter((x) => {
        if (x.optaPersonId == item) {
          games.push(x);
        }
      });
    });
    const recentSeason = season[season.length - 1]; //&& season.at(-1)
    const lastGame =
      (games.length > 0 && games[games.length - 1].Date);
    const lastGameDateYear = new Date(lastGame).getFullYear();

    allPlayers.push({
      optaPersonId: item,
      playerId: recentSeason.playerId,
      Player: recentSeason.Player,
      playerFullName: recentSeason.playerFullName,
      pos: recentSeason.pos,
      teamName: recentSeason.teamName,
      teamShortName: recentSeason.teamShortName,
      teamAbbrevName: recentSeason.teamAbbrevName,
      teamId: recentSeason.teamId,
      optaPersonId: recentSeason.optaPersonId,
      firstName: recentSeason.firstName,
      lastName: recentSeason.lastName,
      optaTeamId: recentSeason.optaTeamId,
      leagueId: recentSeason.leagueId,
      leagueName: recentSeason.leagueName,
      Position: recentSeason.Position,
      Team: recentSeason.Team,
      GM: recentSeason.GM,
      Min: recentSeason.Min,
      Age: recentSeason.Age,
      Goal: recentSeason.Goal,
      Ast: recentSeason.Ast,
      GA: parseInt(recentSeason.Goal) + parseInt(recentSeason.Ast),
      SubOn: recentSeason.SubOn,
      SubOff: recentSeason.SubOff,
      Red: recentSeason.Red,
      Yellow: recentSeason.Yellow,
      lastSeason: lastGameDateYear,
      season: season,
      games: games,
    });
  });

  fse
    .outputFile(`raw_output/player_complete.json`, JSON.stringify(allPlayers))
    .then(() => {
      console.log("The file has been saved!");
    })
    .catch((err) => {
      console.error(err);
    });
};

const teamGames = () => {
  let playerArray = [];
  utils.teamByGameFiles.map((item) => {
    const matchedFile = require(`./raw_output/${item}.json`);
    matchedFile.filter((x) => {
      playerArray.push(x);
    });
  });
  fse
    .outputFile(`raw_output/all_games.json`, JSON.stringify(playerArray))
    .then(() => {
      console.log("The file has been saved!");
    })
    .catch((err) => {
      console.error(err);
    });
  return playerArray;
};

module.exports = {
  processCSVs,
  processPlayerIds,
  groupPlayerData,
  teamGames,
};

require("make-runnable");
