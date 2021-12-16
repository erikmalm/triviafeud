import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { answerIsSelected } from "../redux/reducers/gameSlice"
import CountDownView from "../views/countDownView"

import { VISUAL_COUNT_DOWN_TIME } from "../util/questionUtil"

import QuestionView from "../views/questionView"

export default function QuestionPresenter() {
	const dispatch = useDispatch()

	const { gameTimer, gameTimerStart, currentRound } = useSelector(state => state.game)
	const totalRounds = useSelector(state => state.settings.numberOfRounds)
	const questionState = useSelector(state => state.game.currentQuestion.question)

	const [timerState, setTimerState] = useState(null)

	useEffect(() => {
		const interval = setInterval(() => {
			const msLeft = new Date(gameTimer) - Date.now()
			setTimerState(Math.max(msLeft, 0))
		}, 100)
		return () => clearInterval(interval)
	}, [gameTimer])

	function handleAnswer(answer, answeredRandomly = false) {
		if (!answer) return

		const totalTime = (gameTimerStart - VISUAL_COUNT_DOWN_TIME) / 1000
		const msLeft = (new Date(gameTimer) - Date.now()) / 1000

		dispatch(
			answerIsSelected({
				correctAnswer: answer === questionState.correctAnswer,
				answeredRandomly,
				answerTime: totalTime - msLeft,
			})
		)
	}

	function randomAnswer(answers) {
		const randIndex = Math.floor(Math.random() * answers.length)
		handleAnswer(answers[randIndex].id, true)
	}

	return timerState == null || timerState > gameTimerStart - VISUAL_COUNT_DOWN_TIME ? (
		<CountDownView timePassed={gameTimerStart - timerState} timerState={timerState} />
	) : (
		<QuestionView
			question={questionState}
			timer={timerState / 1000}
			timerStart={(gameTimerStart - VISUAL_COUNT_DOWN_TIME) / 1000}
			handleAnswer={handleAnswer}
			randomAnswer={randomAnswer}
			currentRound={currentRound}
			totalRounds={totalRounds}
		/>
	)
}
