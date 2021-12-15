import GameTimer from "../components/gameTimer"

import styles from "../styles/question.module.css"
import { QuestionIcon, DiceIcon } from "../icons"

export default function QuestionView({
	question,
	timer,
	timerStart,
	handleAnswer,
	randomAnswer,
	currentRound,
	totalRounds,
}) {
	return (
		<div className={styles.main}>
			<GameTimer time={timer} startTime={timerStart} />
			<div className={styles.question}>
				<span>
					Question {currentRound} of {totalRounds}
				</span>
				{question.question}
				<QuestionIcon width={70} color={"var(--pink)"} />
			</div>
			<div className={styles.answersGrid}>
				{question.answers.map(option => (
					<button key={option.id} onClick={() => handleAnswer(option.id)}>
						{option.text}
					</button>
				))}
			</div>
			<button className={styles.randomAnswer} onClick={() => randomAnswer(question.answers)}>
				<DiceIcon color="#fff" />
				<span>Answer Randomly</span>
			</button>
		</div>
	)
}
