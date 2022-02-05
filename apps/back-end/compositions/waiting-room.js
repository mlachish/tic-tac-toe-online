const { createGame } = require("../games")
const { joinGame } = require("../players")
const { disconnectPlayer, emitToPlayer } = require("../players-sockets")

let playerWaiting = null
// add host and join cases
function useWaitingRoom(player) {
    emitToPlayer(player.id, 'status', {status: 'waiting'})
    
    switch (player.connectionOption) {
        case 'random':
            if (playerWaiting && playerWaiting !== player.id) {
                const game = createGame(player.id, playerWaiting)

                joinGame(player.id, game.id)
                joinGame(playerWaiting, game.id)
                disconnectPlayer(player.id)
                disconnectPlayer(playerWaiting)
            } else {
                playerWaiting = player.id
            }
            break
        case 'host':
            // playerWaiting = player.id
            // const game = createGame(playerWaiting)
            // joinGame(playerWaiting, game.id)
            break
        case 'join':
            // if (playerWaiting && playerWaiting !== player.id) {

            //     joinGame(player.id, game.id)
            //     disconnectPlayer(player.id)
            //     disconnectPlayer(playerWaiting)
            // }
            break
    }
}

module.exports = {
    useWaitingRoom
}