import { useRecoilValue } from 'recoil'

import EnterGame from './pages/EnterGame'
import WaitingRoom from './pages/WaitingRoom'
import GameRoom from './pages/GameRoom'
import EndGame from './pages/EndGame'
import { playState } from './store'

function App() {
    const play = useRecoilValue(playState)

    return (
        <div className="App">
            {play === 'enter' && <EnterGame />}
            {play === 'waiting' && <WaitingRoom />}
            {play === 'running' && <GameRoom />}
            {play === 'ended' && <EndGame />}
        </div>
    )
}

export default App
