import styles from "../styles/lobbyActions.module.css"

export default function LobbyActionsView({
	copyInviteLink,
	handleStart,
	toggleReady,
	leaveLobby,
	player,
	participants,
}) {
	return (
		<div className={styles.main}>
			<div className={styles.desktop}>
				<h3>Invite your friends</h3>
				<h5>Server ID</h5>
				<p>{window.location.pathname.replace('/room/', '')}</p>
				<h5>Invite link</h5>
				<p>{window.location.href}</p>
				<button className={styles.copyLink} onClick={() => copyInviteLink()}>Copy link</button>
			</div>
			<div className={styles.mobile}>
				<div className={styles.invite}>
					<input type="text" value={window.location.href} readOnly></input>
					<button onClick={() => copyInviteLink()}>Copy</button>
				</div>
				<div className={styles.buttons}>
					<button className={styles.primary} onClick={() => toggleReady()}>
						{player.ready ? "Not ready" : "Ready"}
					</button>
					<button className={styles.secondary} onClick={() => leaveLobby()}>
						Leave
					</button>
					{player.role === "host" && (
						<button
							onClick={() => handleStart()}
							className={`${styles.secondary} ${styles.start}`}
							disabled={!participants.every(participant => participant.ready)}
						>
							Start
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
