import RoundResultsView from "../views/roundResultsView"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function RoundResultsPresenter() {
	const playersState = useSelector(state => state.server.players)
	const answers = useSelector(state => state.game.playerAnswers)
	const gameState = useSelector(state => state.game)
	const playerId = useSelector(state => state.player.playerId)
	const nrOfRounds = useSelector(state => state.settings.nrOfRounds)

	const [timerState, setTimerState] = useState(null)

	const playersWithAnswers = playersState.map(({ playerName, playerId, score }) => ({
		playerName,
		score,
		...answers.find(answer => answer.playerId === playerId),
	})).sort((a, b) => b.score - a.score)

	const { correctAnswer } = answers.find(answer => answer.playerId === playerId)

	const toggleFinalResults = gameState.currentRound >= nrOfRounds


	/*

	const settingsState = useSelector(state => state.settings)

	console.log(gameState.currentRound)

	if (gameState.currentRound === settingsState)

	const showFinalResults = gameState.currentRound >= nrOfRounds
	
	*/



	useEffect(() => {
		const interval = setInterval(() => {
			const msLeft = new Date(gameState.gameTimer) - Date.now()
			setTimerState(Math.max(Math.round(msLeft / 1000), 0))
		}, 100)
		return () => clearInterval(interval)
	}, [gameState.gameTimer])

	return <RoundResultsView players={playersWithAnswers} timer={timerState} answeredRight={correctAnswer} showFinalResults={toggleFinalResults}/>
}
