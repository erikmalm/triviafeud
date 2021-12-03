import { useSelector } from "react-redux"

export default function Header() {
	const playerState = useSelector(state => state.player)

	return (
		<div className="header">
			<h1>Trivia Feud - {playerState.playerName}</h1>
		</div>
	)
}
