import GameTimer from "../components/gameTimer"

export default function QuestionView({ question, timer, timerStart, handleAnswer, randomAnswer }) {
	return (
		<div>
            <GameTimer time={timer} startTime={timerStart} />
			{question.question}
			<div className="answersGrid">
				{question.answers.map(option => (
					<div className="answer" key={option.id} onClick={() => handleAnswer(option.id)}>
						{option.text}
					</div>
				))}
			</div>
			<div className="randomAnswer" onClick={() => randomAnswer(question.answers)}> {/*  */}
				Answer Randomly
			</div>
		</div>
	)
}
