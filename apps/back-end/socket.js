const { useGameRoom } = require('./compositions/game-room');
const { useWaitingRoom } = require('./compositions/waiting-room')
const { getPlayer, removePlayer } = require('./players');
const { setPlayerSocket, removePlayerSocket } = require('./players-sockets');

module.exports = function createSocketIo(http) {
    const io = require('socket.io')(http)

    io.on('connection', (socket) => {
        socket.on('identify', (userId) => {
            const player = getPlayer(userId)
            setPlayerSocket(player.id, socket)

            if (player.status === 'waiting') {
                useWaitingRoom(player)
            } else if (player.status === 'playing') {
                useGameRoom(player)
            }

            socket.on('disconnect', () => {
                removePlayerSocket(player.id)
            })
        })
    })
}