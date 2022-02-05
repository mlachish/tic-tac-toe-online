const players = {}

function getPlayer(playerId) {
    return players[playerId]
}

function createPlayer({ nickname, connectionOption }) {
    const newId = Buffer.from(Math.random().toString() + nickname).toString(
        'base64'
    )
    players[newId] = {
        id: newId,
        nickname,
        connectionOption,
        room: null,
        status: 'waiting',
    }
    return players[newId]
}

function removePlayer(playerId) {
    delete players[playerId]
}

function joinGame(playerId, gameId) {
    const player = getPlayer(playerId)
    player.gameId = gameId
    player.status = 'playing'
}

module.exports = {
    getPlayer,
    createPlayer,
    removePlayer,
    joinGame,
}
