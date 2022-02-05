const games = {}

function createGame(playerA, playerB) {
    const game = {
        id: Math.random().toString(),
        room: id.slice(-4),
        players: {
            x: playerA,
            o: playerB,
        },
        board: getNewBoard(),
        round: 'x',
        status: 'running',
        winner: null,
        restarted: [],
    }
    games[game.id] = game

    return game
}

function getGame(gameId) {
    return games[gameId]
}

function resetGame(gameId) {
    const game = getGame(gameId)
    Object.assign(game, {
        board: getNewBoard(),
        restarted: [],
        status: 'running',
        winner: null,
    })
}

function removeGame(gameId) {
    delete games[gameId]
}

function getNewBoard() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
}

module.exports = {
    createGame,
    getGame,
    resetGame,
    removeGame,
}
