const { createGame } = require("../games")
const { joinGame } = require("../players")
const { disconnectPlayer, emitToPlayer } = require("../players-sockets")

let randomWaiting = null
// add host and join cases
function useWaitingRoom(player) {
    emitToPlayer(player.id, 'status', {status: 'waiting'})
    
    switch (player.connectionOption) {
        case 'random':
            if (randomWaiting && randomWaiting !== player.id) {
                const game = createGame(player.id, randomWaiting)

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