import styles from "../styles/roundResults.module.css"

export default function FinalResultsView({ players, exit }) {
	return (
		<div className="finalWrapper">
			<h2 className="finalHeader">Final results</h2>

			<div className={styles.players}>
				{players.map((player, index) => (
					<div key={player.playerName} className={styles.player}>
						<p>
							{index + 1}. {player.playerName}
						</p>
						<div>
							<p>{player.score}</p>
						</div>
					</div>
				))}
			</div>

			<button onClick={() => exit()}>Leave</button>
		</div>
	)
}

/*

<div className={styles.players}>{players.map((player, index) => 
                    <div key={player.playerName} className={styles.player}>
                        <p>{index + 1}. {player.playerName}</p>
                        <div>
                            <p>{player.score}</p>
                        </div>
                    </div>
                )}</div>


*/
