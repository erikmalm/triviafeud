import { useDispatch } from "react-redux"

import LobbyActionsView from "../views/lobbyActionsView"

import { setReady } from "../redux/reducers/playerSlice"

import { addGameWatchers, removeGameWatchers } from "../redux/dbwatchers/gameWatcher"
import { notifySuccess, notifyWarning, notifyError } from "../components/notification"

export default function LobbyActionsPresenter({ start, leave, playerState, serverState }) {
	const dispatch = useDispatch()

	function handleSetReady() {
		if (playerState.ready) {
			// Remove watchers
			removeGameWatchers()
		} else {
			// Add watchers
			addGameWatchers()
		}
		dispatch(
			setReady({
				readyState: !playerState.ready,
				serverId: serverState.id,
				playerId: playerState.playerId,
			})
		)
	}

	function copyLink() {
		navigator.clipboard
			.writeText(window.location.href)
			.then(() => notifySuccess("Copied the link"))
			.catch(() => notifyError("Could not copy link"))
	}

	return (
		<LobbyActionsView
			leaveLobby={leave}
			player={playerState}
			participants={serverState.players}
			isReady={playerState.ready}
			toggleReady={handleSetReady}
			copyInviteLink={copyLink}
			handleStart={start}
		/>
	)
}
