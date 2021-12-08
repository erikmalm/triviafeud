import RoundResultsView from "../views/roundResultsView"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function RoundResultsPresenter() {
	const playersState = useSelector(state => state.server.players)
	const answers = useSelector(state => state.game.playerAnswers)
	const gameState = useSelector(state => state.game)
	const playerId = useSelector(state => state.player.playerId)

	const [timerState, setTimerState] = useState(null)

	const playersWithAnswers = playersState.map(({ playerName, playerId, score }) => ({
		playerName,
		score,
		...answers.find(answer => answer.playerId === playerId),
	}))

	const { correctAnswer } = answers.find(answer => answer.playerId === playerId)

	useEffect(() => {
		const interval = setInterval(() => {
			const msLeft = new Date(gameState.gameTimer) - Date.now()
			setTimerState(Math.max(Math.round(msLeft / 1000), 0))
		}, 100)
		return () => clearInterval(interval)
	}, [gameState.gameTimer])

	return <RoundResultsView players={playersWithAnswers} timer={timerState} currentRound={gameState.currentRound} answeredRight={correctAnswer} />
}
