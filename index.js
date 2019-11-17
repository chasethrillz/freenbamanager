var express = require("express");
var bodyParser = require("body-parser");
var teamsManager = require("./teamsManager");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, console.log("online at :3000"));

// ./teams
app.get('/teams', function (req, res) {
    var teams = teamsManager.allTeams();
    console.log(teams);
    res.send({ teams: teams });
});
app.post('/teams/:idTeam', function (req, res) {
    var idTeam = Number(req.params.idTeam);
    var team = teamsManager.teamById(idTeam);
    res.send({ team: team });
});
app.post('/teams/:idTeam/players', function (req, res) {
    var idTeam = Number(req.params.idTeam);
    var team = teamsManager.playersByIdTeam(idTeam);
    res.send({ team: team });
});

app.post('/teams/filter/:teamName', function (req, res) {
    var teamName = req.params.teamName;
    console.log(teamName);
    var filter = teamsManager.teamFilter(teamName);
    console.log(filter);
    res.send({ filter: filter});
});

// ./players
app.get('/players', function (req, res) {
    var players = teamsManager.allPlayers();
    console.log(players);
    res.send({ players: players });
});
app.post('/players/:playerId', function (req, res) {
    var playerId = Number(req.params.playerId);
    var player = teamsManager.playerById(playerId);
    res.send({ player: player });
});
app.post('/players/position/:position', function (req, res) {
    var position = req.params.position;
    var players = teamsManager.playersByPosition(position);
    res.send({ players: players });
});
app.post('/players/filter/:lastName', function (req, res) {
    var lastName = req.params.lastName;
    var players = teamsManager.playersFilter(lastName);
    res.send({ players: players });
});

// ./game
app.post('/game/randomRoster', function (req, res) {
    var players = teamsManager.randomRoster();
    res.send({ players: players });
});
app.post('/game/randomSquad/:idTeam', function (req, res) {
    var idTeam = Number(req.params.idTeam);
    var players = teamsManager.randomSquadByTeam(idTeam);
    res.send({ players: players });
});
