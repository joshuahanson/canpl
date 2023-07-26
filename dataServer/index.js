const express = require("express");
const cors = require("cors");
const expressStaticGzip = require("express-static-gzip");
const path = require("path");

const STATIC_FOLDER = path.join(__dirname, "../", "build/");

const app = express();
const port = 3001;

const player_model = require("./player_model");

app.use(express.json());
app.use(cors());

app.get("/players", (req, res) => {
  player_model
    .getPlayers(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/player-games", (req, res) => {
  player_model
    .getPlayerByGames(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/player-totals", (req, res) => {
  player_model
    .getPlayerBySeason(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/games", (req, res) => {
  player_model
    .getGames(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.use(expressStaticGzip(STATIC_FOLDER));
app.get("*", expressStaticGzip(STATIC_FOLDER));
app.use("*", expressStaticGzip(STATIC_FOLDER));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
