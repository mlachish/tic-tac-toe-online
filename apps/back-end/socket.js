const { useGameRoom } = require('./compositions/game-room')
const { useWaitingRoom } = require('./compositions/waiting-room')
const { getPlayer } = require('./players')
const { setPlayerSocket, removePlayerSocket } = require('./players-sockets')

module.exports = function createSocketIo(http) {
    const io = require('socket.io')(http, {
        cors: { origin: 'http://localhost:3000' },
    })

    io.on('connection', (socket) => {
        socket.on('identify', (userId) => {
            const player = getPlayer(userId)

            if (!player) {
                socket.emit('status', {
                    status: 'enter',
                })
                return
            }

            setPlayerSocket(userId, socket)

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
