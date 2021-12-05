import { useDispatch } from "react-redux"

import LobbyOverviewView from "../views/lobbyOverviewView"

import { setEmoji } from "../redux/reducers/playerSlice"
import { useState, useRef } from "react"

export default function LobbyOverviewPresenter({ kick, serverState, playerState }) {
	const dispatch = useDispatch()

	const [emojiPicker, setEmojiPicker] = useState()

	const emojiTimeoutRef = useRef(null)

	function handleEmojiClick(emojiObject) {
		setEmojiPicker(false)

		// This dispatches the emoji to the database
		dispatch(
			setEmoji({
				emojiState: emojiObject,
				serverId: serverState.id,
				playerId: playerState.playerId,
			})
		)

		// We want to reset timeout if it's not null
		if (emojiTimeoutRef.current != null) clearTimeout(emojiTimeoutRef.current)

		// After 5 seconds, we reset the emoji
		emojiTimeoutRef.current = setTimeout(
			() =>
				dispatch(
					setEmoji({
						emojiState: null,
						serverId: serverState.id,
						playerId: playerState.playerId,
					})
				),
			5000
		)
	}

	return (
		<>
			<LobbyOverviewView
				participants={serverState.players}
				kickPlayer={kick}
				player={playerState}
				onEmojiSelect={(_, emojiObject) => handleEmojiClick(emojiObject.emoji)}
				toggleEmojiPicker={() => setEmojiPicker(!emojiPicker)}
				showEmojiPicker={emojiPicker}
			/>
		</>
	)
}
