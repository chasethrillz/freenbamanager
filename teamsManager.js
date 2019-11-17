teams = require("./data/teams.json");
players = require("./data/players.json");
var teamsManager = {
    // This returns all the teams in an Object array;
    allTeams: () => {
        var allTeams = [];
        for (let index = 0; index < teams.data.length; index++) {
            var element = teams.data[index];
            allTeams.push({
                id: element.id,
                full_name: element.full_name,
                name: element.name
            });
        }
        return allTeams;
    },
    // This returns a team by its id
    teamById: (teamId) => {
        var allTeams = [];
        var teamId = Number(teamId);
        for (let index = 0; index < teams.data.length; index++) {
            var element = teams.data[index];
            if (element.id === teamId) {
                allTeams.push({
                    id: element.id,
                    full_name: element.full_name,
                    name: element.name
                });
                return allTeams;
            }
        }
    },
    // This returns true if your team exists, false if it doesn't
    teamFilter: (teamName) => {
        var upperTeamName = teamName.toUpperCase();
        for (let index = 0; index < teams.data.length; index++) {
            const element = teams.data[index];
            var upperElementTeam = element.name.toUpperCase();
            if (upperElementTeam == upperTeamName) {
                return true;
            }
        }
        return false;
    },
    // This returns all the players in an Object array
    allPlayers: () => {
        var allPlayers = [];
        for (let index = 0; index < players.data.length; index++) {
            var element = players.data[index];
            allPlayers.push({
                id: element.id,
                last_name: element.last_name,
                first_name: element.first_name,
                position: element.position,
                team: element.team.full_name,
            });
        }
        console.log(allPlayers);
        return allPlayers;
    },
    // This returns an Object array containing all the players 
    // of a specific team 
    playersByIdTeam: (idTeam) => {
        idTeam = Number(idTeam);
        var allPlayers = [];
        for (let index = 0; index < players.data.length; index++) {
            var element = players.data[index];
            if (element.team.id == idTeam) {
                allPlayers.push({
                    id: element.id,
                    last_name: element.last_name,
                    first_name: element.first_name,
                    position: element.position,
                    team: element.team.full_name,
                    teamId: element.team.id
                });
            }
        }
        return allPlayers;
    },
    // This returns an Object array of players covering a specific position
    playersByPosition: (position) => {
        var result = [];
        for (let index = 0; index < players.data.length; index++) {
            const element = players.data[index];
            if (element.position === position) {
                result.push({
                    id: element.id,
                    first_name: element.first_name,
                    last_name: element.last_name,
                    team: element.team.full_name,
                    position: element.position
                });
            }
        }
        return result;
    },
    // This returns a player by his id
    playerById: (playerId) => {
        var result;
        for (let index = 0; index < players.data.length; index++) {
            const element = players.data[index];
            if (element.id === playerId) {
                result = {
                    id: element.id,
                    first_name: element.first_name,
                    last_name: element.last_name,
                    position: element.position,
                    team: element.team.full_name,
                    teamId: element.team.id,
                };
            }
        }
        return result;
    },
    // This returns an array of objects containing players with 
    // a specific last name
    playersFilter: (lastName) => {
        var upperLastName = lastName.toUpperCase();
        var result = [];
        for (let index = 0; index < players.data.length; index++) {
            const element = players.data[index];
            if (element.last_name.toUpperCase() === upperLastName) {
                result.push({
                    id: element.id,
                    first_name: element.first_name,
                    last_name: element.last_name,
                    position: element.position,
                    team: element.team.full_name,
                    teamId: element.team.id,
                });
            }
        }
        return result;
    },
    // This creates an Object array containing a random roster: 
    // 16 players from all the teams
    randomRoster: () => {
        // roster -> 16 players
        var randomRoster = [];
        for (let index = 0; index < 16; index++) {
            // Math.floor(Math.random() * (max - min + 1) ) + min;
            var random = Math.floor(Math.random() * (players.data.length - 0 + 1)) + 0;
            var element = players.data[random];
            randomRoster.push({
                index: index,
                id: element.id,
                first_name: element.first_name,
                last_name: element.last_name,
                position: element.position,
                team: element.team.full_name
            });
        }
        return randomRoster;
    },
    // This creates an Object array containing a random squad 
    // for a certain team
    randomSquadByTeam: (teamId) => {
        // squad -> 5 players
        var playersByTeam = teamsManager.playersByIdTeam(teamId);
        var squad = [];
        var oldRandom;
        var i = 0;
        while (i < 5) {
            // Math.floor(Math.random() * (max - min + 1) ) + min;
            var random = Math.floor(Math.random() * (playersByTeam.length - 0 + 1)) + 0;
            var element = playersByTeam[random];
            if (element !== undefined && squad.includes(element) === false) {
                squad.push(element);
                oldRandom = random;
                i++;
            }
        }
        return squad;
    }
}

module.exports = teamsManager;