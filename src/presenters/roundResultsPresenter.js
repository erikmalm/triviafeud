import RoundResultsView from "../views/roundResultsView"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { FIRST_TO_ANSWER } from "../util/settingsUtil"

export default function RoundResultsPresenter() {
	const playersState = useSelector(state => state.server.players)
	const answers = useSelector(state => state.game.playerAnswers)
	const gamemode = useSelector(state => state.settings.gamemode)
	const gameState = useSelector(state => state.game)
	const playerId = useSelector(state => state.player.playerId)
	const nrOfRounds = useSelector(state => state.settings.numberOfRounds)
	const playerAnswers = useSelector(state => state.playerAnswers)

	const [timerState, setTimerState] = useState(null)

	const playersWithAnswers = playersState
		.map(({ playerName, playerId, score }) => ({
			playerName,
			score,
			...answers.find(answer => answer.playerId === playerId),
		}))
		.sort((a, b) => b.score - a.score)

	const correctAnswerId = gameState.currentQuestion.question.correctAnswer
	const correctAnswerText = gameState.currentQuestion.question.answers.find(x => x.id === correctAnswerId).text

	const tooSlow = gameState.playerAnswers.find(player => player.playerId === playerId).answerTime === 99999

	const { correctAnswer, answeredRandomly } = answers.find(answer => answer.playerId === playerId)

	useEffect(() => {
		const interval = setInterval(() => {
			const msLeft = new Date(gameState.gameTimer) - Date.now()
			setTimerState(Math.max(Math.round(msLeft / 1000), 0))
		}, 100)
		return () => clearInterval(interval)
	}, [gameState.gameTimer])

	return (
		<RoundResultsView
			players={playersWithAnswers}
			timer={timerState}
			answeredRight={correctAnswer}
			answeredRandomly={answeredRandomly}
			showFinalResults={gameState.currentRound >= nrOfRounds}
			correctAnswerText={correctAnswerText}
			firstToAnswerMode={gamemode === FIRST_TO_ANSWER && tooSlow}
		/>
	)
}
