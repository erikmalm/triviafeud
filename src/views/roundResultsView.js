import styles from '../styles/roundResults.module.css'

export default function RoundResultsView({ players, timer, answeredRight, showFinalResults }) {
	return (
		<div className={styles.main}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Results</h2>
                <div className={styles.playerResult}>
                    <span>Your answer was</span>
                    {answeredRight ?
                        <div className={styles.correct}>Correct</div>
                        :
                        <div className={styles.inCorrect}>Incorrect</div>
                    }
                </div>
                <div className={styles.players}>{players.map((player, index) => 
                    <div key={player.playerName} className={styles.player}>
                        <p>{index + 1}. {player.playerName}</p>
                        <div>
                            <p>{player.score}</p>
                            <span>{player.addedScore > 0 ? `+${player.addedScore}` : ''}</span>
                        </div>
                    </div>
                )}</div>
            </div>
            <div className={styles.continue}>
                <h3>{showFinalResults ? "Showing final results in" : "Starting next round in" }</h3>
                <div>{timer}</div>
            </div>
		</div>
	)
}
