const { createGame } = require("../games")
const { joinGame } = require("../players")
const { disconnectPlayer } = require("../players-sockets")

let randomWaiting = null

function useWaitingRoom(player) {
    switch (player.connectionOption) {
        case 'random':
            if (randomWaiting && randomWaiting !== player.id) {
                createGame(player.id, randomWaiting)
                joinGame(player.id, game.id)
                joinGame(randomWaiting, game.id)
                disconnectPlayer(player.id)
                disconnectPlayer(randomWaiting)
            } else {
                randomWaiting = player.id
            }
            break
        case 'host':
            break
        case 'join':
            break
    }
}

module.exports = {
    useWaitingRoom
}