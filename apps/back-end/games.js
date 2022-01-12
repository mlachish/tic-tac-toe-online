const games = {}

function createGame(playerA, playerB) {
    const game = {
        id: Math.random().toString(),
        players: {
            x: playerA,
            o: playerB
        },
        board: getNewBoard(),
        round: 'x',
        status: 'running',
        winner: null
    }
    games[game.id] = game

    return game
}

function getGame(gameId) {
    return games[gameId]
}

function removeGame(gameId) {
    delete games[gameId]
}

function getNewBoard() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

module.exports = {
    createGame,
    getGame,
    removeGame
}