const utils = require("./utils");
const _ = require("lodash");

const getPlayers = (req) => {
  return new Promise(function (resolve, reject) {
    const { id, year, limit } = req.query;
    const limitBy = limit || 1000;

    const playersList = allPlayers(id, year).slice(0, limitBy);

    resolve(playersList);
  });
};

const allPlayers = (id, year) => {
  const matchedFile = require(`./raw_output/player_complete.json`);

  return matchedFile.filter((x) => {
    if (year) {
      return parseInt(year) == parseInt(x.lastSeason);
    }
    if (id) {
      return;
    }
    if (year && id) {
      return parseInt(year) == parseInt(x.lastSeason) && id == x.optaPersonId;
    }

    return x;
  });
};

const getPlayerBySeason = (req) => {
  return new Promise(function (resolve, reject) {
    const { id } = req.query;
    const playerTotal = _getPlayerBySeason(id);
    resolve(playerTotal);
  });
};

const getPlayerByGames = (req) => {
  return new Promise(function (resolve, reject) {
    const { year, id } = req.query;
    const playerYear = _getPlayerByGame(year, id);
    resolve(playerYear);
  });
};

const _getPlayerByGame = (year, id) => {
  const fileArray = year
    ? utils.playerByGameFiles.filter((x) => x.includes(year))
    : utils.playerByGameFiles;
  const playerByYear = fileArray.map((item) => {
    const matchedFile = require(`./raw_output/${item}.json`);
    return matchedFile.filter((x) => x.optaPersonId == id);
  });
  return playerByYear;
};

const _getPlayerBySeason = (id) => {
  const fileArray = utils.playerBySeasonFiles;
  const playerTotals = fileArray.map((item) => {
    const matchedFile = require(`./raw_output/${item}.json`);
    return matchedFile.filter((x) => x.optaPersonId == id)[0];
  });
  return playerTotals;
};

const getGames = (req) => {
  return new Promise(function (resolve, reject) {
    const { year, id, limit } = req.query;
    const limitBy = limit || 1000;
    const games = allGames(year, id).slice(0, limitBy);
    resolve(games);
  });
};

const allGames = (year, id) => {
  const matchedFile = require(`./raw_output/all_games.json`);

  return matchedFile
    .filter((x) => {
      if (year && id) {
        return x.scatterId == id;
      }
      if (year) {
        const getYear = new Date(x.Date).getFullYear();
        return year == getYear;
      }
      if (id) {
        return x.scatterId == id;
      }
    })
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));
};

module.exports = {
  getPlayerByGames,
  getPlayerBySeason,
  getPlayers,
  getGames,
};
