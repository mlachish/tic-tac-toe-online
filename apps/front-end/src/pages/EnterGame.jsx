import { useContext } from 'react'
import { TicTacToeContext } from '../store'

function login(nickname, connectionOption) {
	return fetch(`${import.meta.env.VITE_API_URL}/api/enter`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ nickname, connectionOption }),
	}).then((res) => {
		return res.json()
	})
}

export default function EnterGame() {
	const { setPlayerToken } = useContext(TicTacToeContext)

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				const nickname = e.target.elements.nickname.value
				const connectionOption =
					e.target.elements.connectionOption.value

				login(nickname, connectionOption).then((player) => {
					setPlayerToken(player.id)
				})
			}}
		>
			<input name='nickname' placeholder='nickname' />
			<label>
				<input
					type='radio'
					name='connectionOption'
					value='random'
					defaultChecked
				/>
				Random
			</label>
			<label>
				<input type='radio' name='connectionOption' value='host' />
				Host
			</label>
			<label>
				<input type='radio' name='connectionOption' value='Join' />
				Join
			</label>
			<button>Play</button>
		</form>
	)
}
