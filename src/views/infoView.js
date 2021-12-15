import styles from "../styles/info.module.css"

import { LogoutIcon, PeopleIcon, CrossIcon } from "../icons"

export default function InfoView({ currentRound, leave, people, players }) {
	return (
		<>
			{currentRound.show && (
				<p className={styles.round}>
					Round {currentRound.round} of {currentRound.max}
				</p>
			)}
			<div className={styles.buttons}>
				{leave.show && (
					<button className={styles.leaveButton} onClick={() => leave.do()}>
						<LogoutIcon color="#fff" />
					</button>
				)}
				{people.showButton && (
					<button className={styles.peopleButton} onClick={() => people.toggle(true)}>
						<PeopleIcon color="#fff" />
					</button>
				)}
			</div>
			{people.showWindow && (
				<>
					<div onClick={() => people.toggle(false)} className={styles.peopleBack}></div>
					<div className={styles.people}>
						<CrossIcon color="#fff" className={styles.closePeople} onClick={() => people.toggle(false)} />
						<h2>Players</h2>
						<div className={styles.peopleList}>
							{players.map(player => (
								<div>
									<p>{player.playerName}</p>
									<p>{player.score}</p>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</>
	)
}
