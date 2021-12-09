// Emoji
import Picker from "emoji-picker-react"
import { AddReactionIcon, CheckIcon, BlockIcon, SettingsIcon } from "../icons/"

import styles from "../styles/lobbyOverview.module.css"

export default function LobbyOverviewView({
	participants,
	kickPlayer,
	player,
	onEmojiSelect,
	showEmojiPicker,
	toggleEmojiPicker,
	toggleSettings,
}) {
	function isKickable(participant) {
		return player.role === "host" && participant.role !== "host"
	}
	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h2>{player.playerName}</h2>
				<div className={styles.emojiPicker}>{showEmojiPicker && <Picker onEmojiClick={onEmojiSelect} />}</div>
                <div className={styles.topRight}>
                    <AddReactionIcon onClick={() => toggleEmojiPicker()} />
                    {player.role === 'host' && <SettingsIcon onClick={toggleSettings}/>}
                </div>
			</div>
			<div className={styles.lobbyParticipants}>
				{participants.map(participant => (
					<div key={participant.playerId} className={isKickable(participant) ? styles.kickable : ""}>
						{participant.emoji != null && <div className={styles.speechBubble}>{participant.emoji}</div>}
						{participant.ready && <CheckIcon color="var(--green)" />}
						<p title={participant.playerName}>
							{participant.role === "host" && <span>[host] </span>}
							{participant.playerName}
						</p>
						{isKickable(participant) && (
							<BlockIcon
								title={"Kick player"}
								className={styles.kick}
								onClick={() => kickPlayer(participant.playerId)}
								color="var(--pink)"
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
