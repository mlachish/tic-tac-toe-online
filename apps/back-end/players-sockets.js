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

function emitToPlayer(playerId, eventName, data) {
    const socket = getPlayerSocket(playerId)
    if (socket) {
        socket.emit(eventName, data)
    }
}

module.exports = {
    setPlayerSocket,
    getPlayerSocket,
    removePlayerSocket,
    emitToPlayer,
    disconnectPlayer,
}
