import { SpinnerIcon } from "../icons"
import { API_STATES } from "../api"

const answerWrongComments = ["Had a rough day?", "Getting there!", "You can do Better!", "Try again!", "Are you sure?"]

export default function QuestionView({ question, handleAnswer, currentTime }) {
	return (
		<div>
			{question.question}
			<div className="answersGrid">
				{question.answers.map(option => (
					<div className="answer" key={option.id} onClick={() => handleAnswer(option.id)}>
						{option.text}
					</div>
				))}
			</div>
		</div>
	)
}
