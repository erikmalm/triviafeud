import { useDispatch } from "react-redux"

import LobbyOverviewView from "../views/lobbyOverviewView"

import { setEmoji } from "../redux/reducers/playerSlice"
import { useState, useRef } from "react"

export default function LobbyOverviewPresenter({ kick, serverState, playerState, showSettings }) {
	const dispatch = useDispatch()

	const [emojiPicker, setEmojiPicker] = useState()

	const emojiTimeoutRef = useRef(null)

	function handleEmojiClick(emoji) {
		setEmojiPicker(false)

		dispatch(setEmoji(emoji))

		// We want to reset timeout if it's not null
		if (emojiTimeoutRef.current != null) clearTimeout(emojiTimeoutRef.current)

		// After 5 seconds, we reset the emoji
		emojiTimeoutRef.current = setTimeout(() => dispatch(setEmoji(null)), 5000)
	}

	return <LobbyOverviewView
		participants={serverState.players}
		kickPlayer={kick}
		player={playerState}
		onEmojiSelect={(_, emojiObject) => handleEmojiClick(emojiObject.emoji)}
		toggleEmojiPicker={() => setEmojiPicker(!emojiPicker)}
		showEmojiPicker={emojiPicker}
		toggleSettings={showSettings}
	/>
}
