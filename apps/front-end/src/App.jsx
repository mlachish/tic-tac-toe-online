import { socket } from './socket.js'
import { useContext, useEffect } from 'react'

import EnterGame from './pages/EnterGame'
import WaitingRoom from './pages/WaitingRoom'
import GameRoom from './pages/GameRoom'
import EndGame from './pages/EndGame'
import { TicTacToeContext } from './store'

function App() {
	const { playState } = useContext(TicTacToeContext)

	return (
		<div className='App'>
			{playState === 'enter' && <EnterGame />}
			{playState === 'waiting' && <WaitingRoom />}
			{playState === 'running' && <GameRoom />}
			{playState === 'ended' && <EndGame />}
		</div>
	)
}

export default App
