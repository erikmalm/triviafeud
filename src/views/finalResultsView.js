import styles from "../styles/finalResults.module.css"

import { CheckIcon } from "../icons"

export default function FinalResultsView({ players, exit }) {
	return (
		<div className={styles.main}>
			<h2 className="finalHeader">Final results</h2>
			<div className={styles.overflow}>
				{players.length < 3 ? <ListPlayers players={players} /> : <ResultsMoreThanThree players={players} />}
			</div>

			<button className={styles.leave} onClick={() => exit()}>
				Leave
			</button>
		</div>
	)
}

function ListPlayers({ players }) {
	return (
		<div className={styles.playersList}>
			<div>
				<p></p>
				<p className={`${styles.heading} ${styles.ca}`}>Correct answers</p>
				<p className={`${styles.heading} ${styles.score}`}>Score</p>
			</div>
			{players.map(player => (
				<div key={player.playerName} className={styles.player}>
					<p className={styles.name}>
						{player.place}. {player.playerName}
					</p>
					<p className={styles.ca}>{player.correctAnswers}</p>
					<p className={styles.score}>{player.score}</p>
				</div>
			))}
		</div>
	)
}

function ResultsMoreThanThree({ players }) {
	const [first, second, third, ...rest] = players
	return (
		<div>
			<div className={styles.pedestals}>
				<Pedestal player={second} />
				<Pedestal player={first} />
				<Pedestal player={third} />
			</div>
			<ListPlayers players={rest} />
		</div>
	)
}

function Pedestal({ player }) {
	return (
		<div className={`${styles.pedestal} ${styles["n" + player.place]}`}>
			<div className={styles.pedestalName}>
				<span>{player.playerName}</span>
			</div>
			<div className={styles.block}>
				<span>{player.place}</span>
				<div>
					<span>{player.score}</span>
					<div className={styles.correct}>
						<CheckIcon color="currentColor" width="16" />
						<span>{player.correctAnswers}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
