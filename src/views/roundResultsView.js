import styles from "../styles/roundResults.module.css"
import { DiceIcon } from "../icons"

export default function RoundResultsView({
	players,
	timer,
	answeredRight,
	answeredRandomly,
	showFinalResults,
	correctAnswerText,
}) {
	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h2 className={styles.heading}>Results</h2>
				<div className={styles.playerResult}>
					<span>Your answer was</span>
					{answeredRight ? (
						<div>
							<div className={styles.correct}>Correct</div>
							{answeredRandomly && <span>Which was: {correctAnswerText}</span>}
						</div>
					) : (
						<div>
							<div className={styles.inCorrect}>Incorrect</div>
							<span>Correct answer was: {correctAnswerText}</span>
						</div>
					)}
				</div>
				<div className={styles.players}>
					{players.map((player, index) => (
						<div key={player.playerName} className={styles.player}>
							<p>
								{index + 1}. {player.playerName}{" "}
								{player.answeredRandomly ? <DiceIcon color="var(--green)" width="18" /> : ""}
							</p>
							<div>
								<p>{player.score}</p>
								<span>{player.addedScore > 0 ? `+${player.addedScore}` : ""}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.continue}>
				<h3>{showFinalResults ? "Showing final results in" : "Starting next round in"}</h3>
				<div>{timer}</div>
			</div>
		</div>
	)
}
