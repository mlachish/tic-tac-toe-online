import { useEffect } from 'react'
import {
	RecoilRoot,
	atom,
	useSetRecoilState,
	useRecoilValue,
	selector,
} from 'recoil'
import { socket } from './socket.js'

export const playState = atom({
	key: 'playState',
	default: localStorage.userToken ? '' : 'enter',
})
export const gameStatusState = atom({ key: 'gameStatusState', default: {} })

export function useSetPlayerToken() {
	const setPlayState = useSetRecoilState(playState)

	return function setPlayerToken(playerId) {
		localStorage.setItem('userToken', playerId)
		setPlayState('identify')
	}
}

const mySignState = selector({
	key: 'mySignState',
	get: ({ get }) => {
		const play = get(playState)
		const gameStatus = get(gameStatusState)

		return (
			play === 'running' &&
			(localStorage.userToken === gameStatus.players.x ? 'x' : 'o')
		)
	},
})

export const isMyTurnState = selector({
	key: 'isMyTurnState',
	get: ({ get }) => {
		const gameStatus = get(gameStatusState)

		return gameStatus && gameStatus.round === get(mySignState)
	},
})

export function useMakeMove() {
	const gameStatus = useRecoilValue(gameStatusState)

	return function makeMove(i, j) {
		if (!gameStatus.board[i][j]) {
			socket.emit('move', { i, j })
		}
	}
}

function StateInit() {
	const setGameStatus = useSetRecoilState(gameStatusState)
	const setPlayState = useSetRecoilState(playState)
	const play = useRecoilValue(playState)

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
		if (play === 'identify') {
			socket.emit('identify', localStorage.userToken)
		}
	}, [play])

	return null
}

export default function TicTacToeProvider({ children }) {
	return (
		<RecoilRoot>
			<StateInit />
      {children}
		</RecoilRoot>
	)
}
