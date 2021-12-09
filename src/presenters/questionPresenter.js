// React-Redux, reducers and util
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { answerIsSelected } from "../redux/reducers/gameSlice"

import QuestionView from "../views/questionView"

export default function QuestionPresenter() {
	const dispatch = useDispatch()

	const { gameTimer, gameTimerStart, currentRound } = useSelector(state => state.game)
	const totalRounds = useSelector(state => state.settings.nrOfRounds)
	const questionState = useSelector(state => state.game.currentQuestion.question)

	const [timerState, setTimerState] = useState(null)

	useEffect(() => {
		const interval = setInterval(() => {
			const msLeft = new Date(gameTimer) - Date.now()
			setTimerState(Math.max(msLeft / 1000, 0))
		}, 100)
		return () => clearInterval(interval)
	}, [gameTimer])

	function handleAnswer(answer, answeredRandomly = false) {
		if (!answer) return

		dispatch(answerIsSelected({correctAnswer: answer === questionState.correctAnswer, answeredRandomly}))
	}

	// gameTimerStart => game.gameTimerStart
	// timerState => new Date(game.gameTimer) - Date.now()



	// time/startTime  

	function randomAnswer(answers) {
		const randIndex = Math.floor(Math.random() * answers.length)
		handleAnswer(answers[randIndex].id, true)
	}

	return <QuestionView 
		question={questionState} 
		timer={timerState} 
		timerStart={gameTimerStart / 1000} 
		handleAnswer={handleAnswer} 
		randomAnswer={randomAnswer} 
        currentRound={currentRound}
        totalRounds={totalRounds}
	/>
}
