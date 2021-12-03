// Import from react-redux
import { useSelector, useDispatch } from "react-redux"

// View
import QuestionView from "../views/questionView"

// Default function
export default function QuestionPresenter() {
	function handleAnswer(answer) {
		console.log(answer)
	}

	// This keeps track of changes to states in the store
	const questionState = useSelector(state => state.game.currentQuestion.question)

	return (
		<div>
			<QuestionView question={questionState} handleAnswer={handleAnswer} />
		</div>
	)
}
