import { socket } from './socket.js'
import { useEffect, useState } from 'react'

import EnterGame from './pages/EnterGame'
import WaitingRoom from './pages/WaitingRoom'
import GameRoom from './pages/GameRoom'
import EndGame from './pages/EndGame'

function App() {
  const [playState, setPlayState] = useState(localStorage.userToken ? null : 'enter')
  const [gameStatus, setGameStatus] = useState(null)

  useEffect(() => {
    socket.on('status', (gameStatus) => {
      setGameStatus(gameStatus)
      setPlayState(gameStatus.status) 
    })

    socket.on('connect', () => setPlayState('identify'))

    socket.on('disconnect', () => {
      socket.connect()
    })
  }, [])

  useEffect(() => {
    if (playState === 'identify') {
      socket.emit('identify', localStorage.userToken)
    }
  }, [playState])

  function setPlayerToken(playerId) {
    localStorage.setItem('userToken', playerId)
    setPlayState('identify')
  }

  return (
    <div className="App">
      {playState === 'enter' && <EnterGame onEnterGame={setPlayerToken}/>}
      {playState === 'waiting' && <WaitingRoom />}
      {playState === 'running' && <GameRoom gameStatus={gameStatus}/>}
      {playState === 'ended' && <EndGame />}
    </div>
  )
}

export default App
