import {useRecoilValue} from 'recoil'

import { isMyTurnState, useMakeMove, gameStatusState } from '../store'
import Score from '../components/Score'

export default function GameRoom() {
    const isMyTurn = useRecoilValue(isMyTurnState)
    const gameStatus = useRecoilValue(gameStatusState)
    const makeMove = useMakeMove()

	return (
		<>
			<h1>{isMyTurn ? 'My Turn' : 'Wait for your turn'}</h1>
			<table>
				<tbody>
					{gameStatus.board.map((row, i) => (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j} onClick={() => makeMove(i, j)}>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<Score />
		</>
	)
}
