// Emoji
import Picker from "emoji-picker-react"
import { AddReactionIcon } from "../icons/"

export default function LobbyView({
	participants,
	toggleReady,
	leaveLobby,
	kickPlayer,
	isReady,
	player,
	onEmojiSelect,
	showEmojiPicker,
	toggleEmojiPicker,
	copyInviteLink,
}) {
	return (
		<div className="lobbyWrapper">
			<div className="lobbyParticipants">
				{participants.map(participant => (
					<p className={`lobbyParticipant`} key={participant.playerId}>
						{participant.playerName} {participant.ready ? "ready" : "not ready"}{" "}
						{participant.role === "host" ? "host" : ""}
						{participant.emoji != null ? participant.emoji : ""}
						{player.role === "host" && participant.role !== "host" && (
							<button onClick={() => kickPlayer(participant.playerId)}>KICK</button>
						)}
					</p>
				))}
			</div>
			<div className="gameSettings">
				<p>Game Settings</p>
			</div>
			<div className="lobbyButtons">
				<input type="text" id="inviteLink" value={window.location.href} readOnly></input>
				<button onClick={() => copyInviteLink()}>Copy</button>
				<button onClick={() => toggleReady()}>{isReady ? "GIMME SOME MORE TIME" : "READY"}</button>
				{player.role === "host" && (
					<button disabled={!participants.every(participant => participant.ready)}>START</button>
				)}
				<button onClick={() => leaveLobby()}>EXIT</button>
			</div>

			<div>{showEmojiPicker && <Picker onEmojiClick={onEmojiSelect} />}</div>
			<div onClick={() => toggleEmojiPicker()}>
				<AddReactionIcon />
			</div>
		</div>
	)
}
