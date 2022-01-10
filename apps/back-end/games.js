const games = {}

function createGame(playerA, playerB) {
    const game = {
        id: Math.random().toString(),
        players: {
            x: playerA,
            o: playerB
        },
        board: getNewBoard(),
        round: 'x'
    }
    games[game] = game
    return 
}

function getNewBoard() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

module.exports = {
    createGame
}