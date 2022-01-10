const { useGameRoom } = require('./compositions/useGameRoom');
const { useWaitingRoom } = require('./compositions/waiting-room')
const { getPlayer, removePlayer } = require('./players')

module.exports = function createSocketIo(http) {
    const io = require('socket.io')(http);

    io.on('connection', (socket) => {
        socket.on('identify', (userId) => {
            const player = getPlayer(userId)
            
            if(player.status === 'waiting') {
                useWaitingRoom(socket, player)
            } else if(player.status === 'playing') {
                useGameRoom()
            }
        })
    });
}