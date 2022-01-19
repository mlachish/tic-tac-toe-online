const e = require("express")
const { getGame, resetGame } = require("../games")
const { getPlayerSocket, emitToPlayer } = require("../players-sockets")

function useGameRoom(player) {
    const game = getGame(player.gameId)
    const socket = getPlayerSocket(player.id)

    function sendStatus() {
        socket.emit('status', game)
    }
    sendStatus()

    socket.on('request-status', sendStatus)
    
    socket.on('move', ({i, j}) => { 
        const currentPlayerId = game.players[game.round]

        if (currentPlayerId !== player.id) {
            return
        }

        if (game.board[i][j] !== null) {
            return
        }

        game.board[i][j] = game.round 

        const {status, winner} = getGameStatus(game)
        game.status = status
        game.winner = game.players[winner] || null
        
        if (status === 'running') {
            game.round = game.round === 'x' ? 'o' : 'x'
        }

        emitToPlayer(game.players.x, 'status', game)
        emitToPlayer(game.players.o, 'status', game)
    })

    socket.on('restart', () => {
        if (game.restarted.includes(player.id)) {
            return
        } 
        game.restarted.push(player.id)

        if (game.restarted.length === 2) {
            resetGame(game.id)
            emitToPlayer(game.players.x, 'status', game)
            emitToPlayer(game.players.o, 'status', game)
        }
    })
}

function getGameStatus({round, board}) {
    const status = {status: 'running', winner: null}
    const winningString = round + round + round

    for (let i = 0; i < board.length; i++) {
        const row = board[i]
        const column = board.map((row) => row[i])

        if (row.join('') === winningString || column.join('') === winningString) {
            status.status = 'ended'
            status.winner = round
            break
        }
    }
    
    if (!status.winner) {
        const diagonalA = board.map((_, i) => board[i][i])
        const diagonalB = board.map((_, i) => board[board.length - i - 1][i])
    
        if (diagonalA.join('') === winningString || diagonalB.join('') === winningString) {
            status.status = 'ended'
            status.winner = round
        }
    }

    if (!status.winner && board.every(row => !row.includes(null))) {
        status.status = 'ended'
    }

    return status
}

module.exports = {
    useGameRoom
}