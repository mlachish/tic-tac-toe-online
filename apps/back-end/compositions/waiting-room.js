const { createGame } = require("../games")
const { joinGame } = require("../players")

const randomWaiting = null


function useWaitingRoom(socket, player) {
    switch (player.connectionOption) {
        case 'random':
            if (randomWaiting) {
                randomWaiting(player.id)
                socket.disconnect()
            } else {
                randomWaiting = (opponentId) => {
                    const game = createGame(player.id, opponentId)
                    joinGame(player.id, game.id)
                    joinGame(opponentId, game.id)
                    socket.disconnect()
                }
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