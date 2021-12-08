// React-Redux, reducers and util
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { answerIsSelected, setGameState } from "../redux/reducers/gameSlice"
import { GAME_STATES } from "../util/gameUtil"

// View
import QuestionView from "../views/questionView"


// Default function
export default function QuestionPresenter() {
	const gameState = useSelector(state => state.game)
	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)

    const [timerState, setTimerState] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            const msLeft = new Date(gameState.gameTimer) - Date.now()
            setTimerState(Math.max(msLeft / 1000, 0))
        }, 100)
        return () => clearInterval(interval)
    }, [gameState.gameTimer])

	// This keeps track of changes to states in the store
	const questionState = useSelector(state => state.game.currentQuestion.question)

	const dispatch = useDispatch()

	// The correct answer is found in the game state
	let correctAnswer = gameState.currentQuestion.question.correctAnswer

	// let currentTime = getTime()

	// let startTime = new Date()

	// We can dispatch the answer compared to the correct answer
	async function handleAnswer(answer) {
		if (!answer) return

		// should change game state
		dispatch(setGameState(GAME_STATES.waiting))

		let checkAnswer = answer === correctAnswer // if correct returns true, else false

		// dispatch useranswer with status on correct server for the current player
		await dispatch(
			answerIsSelected({
				serverId: serverState.id,
				playerId: playerState.playerId,
				correctAnswer: checkAnswer,
				// TODO: ADD TIME/SCORE CALCULATION
			})
		)
      
        // Wait for the other players
        dispatch(setGameState(GAME_STATES.waitingForPlayers))
	}

	function randomAnswer(answers) {
		handleAnswer(answers[Math.floor(Math.random() * answers.length)].id)
	}



	return (
		<div>
			<QuestionView question={questionState} timer={timerState} timerStart={gameState.gameTimerStart / 1000} handleAnswer={handleAnswer} randomAnswer={randomAnswer} />
		</div>
	)
}
