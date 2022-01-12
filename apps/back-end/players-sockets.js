const playersSockets = {}

function setPlayerSocket(playerId, socket) {
    playersSockets[playerId] = socket
}

function getPlayerSocket(playerId) {
    return playersSockets[playerId]
}

function removePlayerSocket(playerId) {
    delete playersSockets[playerId]
}

function disconnectPlayer(playerId) {
    const socket = getPlayerSocket(playerId)
    if (socket) {
        socket.disconnect()
        removePlayerSocket(playerId)
    }
}

module.exports = {
    setPlayerSocket,
    getPlayerSocket,
    removePlayerSocket,
    disconnectPlayer
}
