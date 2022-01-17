export default function EnterGame({onEnterGame}) { 
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            
        }}>
            <input name="nickname" placeholder="nickname" />
            <button>Look For A Game</button>
            <button>Host Game</button>
            <button>Join Game</button>
        </form>
    )
}