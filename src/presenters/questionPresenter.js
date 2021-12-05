// Import from react-redux
import { useSelector, useDispatch } from "react-redux"
import { answerIsSelected } from "../redux/reducers/gameSlice"

// View
import QuestionView from "../views/questionView"

// Default function
export default function QuestionPresenter() {
	const gameState = useSelector(state => state.game)
	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)

	const today = new Date()

	const dispatch = useDispatch()

	// The correct answer is found in the game state
	let correctAnswer = gameState.currentQuestion.question.correctAnswer

	let currentTime = getTime()

	let startTime = new Date()

	// We can dispatch the answer compared to the correct answer
	function handleAnswer(answer) {
		if (!answer) return

		let checkAnswer = answer === correctAnswer // if correct returns true, else false

		// dispatch useranswer with status on correct server for the current player
		dispatch(
			answerIsSelected({
				serverId: serverState.id,
				playerId: playerState.playerId,
				correctAnswer: checkAnswer,
			})
		)

		let answerTime = new Date()

		console.log(answerTime - startTime)
	}

	function getTime() {
		let hours,
			minutes,
			seconds = ""

		if (today.getHours() < 10) hours = "0" + today.getHours()
		else hours = today.getHours()

		if (today.getMinutes() < 10) minutes = "0" + today.getMinutes()
		else minutes = today.getMinutes()

		if (today.getSeconds() < 10) seconds = "0" + today.getSeconds()
		else seconds = today.getSeconds()

		return hours + ":" + minutes + ":" + seconds
	}

	// This keeps track of changes to states in the store
	const questionState = useSelector(state => state.game.currentQuestion.question)

	return (
		<div>
			<QuestionView question={questionState} handleAnswer={handleAnswer} currentTime={currentTime} />
		</div>
	)
}
