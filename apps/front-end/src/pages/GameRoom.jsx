import { useMemo } from 'react'

import { socket } from '../socket'

export default function GameRoom({gameStatus}) { 
    const mySign = useMemo(() => {
        return localStorage.userToken === gameStatus.players.x ? 'x' : 'o'
    }, [])

    const isMyTurn = useMemo(() => {
        return gameStatus.round === mySign
    }, [gameStatus])

    function handleClick(i, j) {
        if (!gameStatus.board[i][j]) {
            socket.emit('move', {i,j})
        }
    }

    return (
        <>
            <div>game room</div>
            <p>{isMyTurn ? 'My Turn' : 'Wait for your turn'}</p>
            <table>
                <tbody>
                    {gameStatus.board.map((row, i) => 
                        <tr key={i}>
                            {row.map((cell, j) => 
                                <td key={j} onClick={() => handleClick(i, j)}>
                                    {cell}
                                </td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}