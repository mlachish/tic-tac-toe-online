import { createContext, useState, useEffect, useMemo } from 'react'
import { socket } from './socket.js'

export const TicTacToeContext = createContext({})

export default function TicTacToeProvider({ children }) {
	const [playState, setPlayState] = useState(
		localStorage.userToken ? null : 'enter'
	)
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

  const mySign = useMemo(() => {
		return playState === 'running' && (localStorage.userToken === gameStatus.players.x ? 'x' : 'o')
	}, [playState])

	const isMyTurn = useMemo(() => {
		return gameStatus && gameStatus.round === mySign
	}, [gameStatus])

	function makeMove(i, j) {
		if (!gameStatus.board[i][j]) {
			socket.emit('move', { i, j })
		}
	}

	return (
		<TicTacToeContext.Provider
			value={{ playState, setPlayerToken, gameStatus, isMyTurn, makeMove }}
		>
			{children}
		</TicTacToeContext.Provider>
	)
}
