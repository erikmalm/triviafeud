import store from "../store"

import { update } from "../reducers/playerSlice"

import { watch, ignore } from "./watcher"

function playerStateWatcher(snapshot, state) {
	const value = snapshot.val()
	if (value === null) return
	store.dispatch(update({ state, value }))
}

export function watchPlayerStates(playerId) {
	watch(`players/${playerId}/playerId`, "value", snapshot => playerStateWatcher(snapshot, "playerId"))
	watch(`players/${playerId}/playerName`, "value", snapshot => playerStateWatcher(snapshot, "playerName"))
	watch(`players/${playerId}/ready`, "value", snapshot => playerStateWatcher(snapshot, "ready"))
	watch(`players/${playerId}/role`, "value", snapshot => playerStateWatcher(snapshot, "role"))
	watch(`players/${playerId}/score`, "value", snapshot => playerStateWatcher(snapshot, "score"))
	watch(`players/${playerId}/emoji`, "value", snapshot => playerStateWatcher(snapshot, "emoji"))
	watch(`players/${playerId}/correctAnswers`, "value", snapshot => playerStateWatcher(snapshot, "correctAnswers"))
}

export function ignorePlayerStates() {
	const playerId = store.getState().player.playerId
	ignore(`players/${playerId}/playerId`, "value")
	ignore(`players/${playerId}/playerName`, "value")
	ignore(`players/${playerId}/ready`, "value")
	ignore(`players/${playerId}/role`, "value")
	ignore(`players/${playerId}/score`, "value")
	ignore(`players/${playerId}/emoji`, "value")
	ignore(`players/${playerId}/correctAnswers`, "value")
}
