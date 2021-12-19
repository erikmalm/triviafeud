import { db } from "../../api/fireSource"

import { setPlayers, setState, setHost } from "../reducers/serverSlice"

import { setSetting } from "../reducers/settingsSlice"

import { decodeFirebaseArray, leaveServer } from "../../util/util.js"

import { SERVER_STATES } from "../../util/serverUtil"

import store from "../store"

import { notifySuccess, notifyWarning, notifyInfo } from "../../components/notification"

import { addRoom, removeRoom } from "../reducers/publicRoomsSlice"

import { watch, ignore } from "./watcher"

import { settings } from "../../util/settingsUtil"

/**
 * Keeps track of values in the redux server state
 */
export function watchServerState() {

	settings.forEach(setting =>
		watch("settings/" + setting.name, "value", snapshot => {
			const val = snapshot.val()
			if (val === null) return
			store.dispatch(setSetting({ setting: setting.name, value: val }))
		})
	)

	watch("state", "value", stateWatcher)
	watch("players", "value", playersWatcher)
	watch("players", "child_removed", kickedWatcher)
	watch("host", "value", hostChangeWatcher)
}

/**
 * Stops watching for values in the redux server state
 */
export function ignoreServerStates() {
	settings.forEach(setting => ignore("settings/" + setting.name, "value"))

	ignore("state", "value")
	ignore("players", "value")
	ignore("players", "child_removed")
	ignore("host", "value")
}

function playersWatcher(snapshot) {
	const vals = snapshot.val()
	if (vals === null) return
	store.dispatch(setPlayers(decodeFirebaseArray(vals)))
}

function stateWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setState(val))
}

function kickedWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	const playerState = store.getState().player

	const leavingPlayerName = store.getState().server.players.find(e => e.playerId === val.playerId).playerName

	if (val.playerId === playerState.playerId) {
		notifyWarning("You have been kicked")
		leaveServer()
	} else {
		notifySuccess(leavingPlayerName + " left the game")
	}
}

function hostChangeWatcher(snapshot) {
	const val = snapshot.val()
	const server = store.getState().server
	if (server.host == null) store.dispatch(setHost(val))
	else {
		store.dispatch(setHost(val))
		const newHost = store.getState().server.players.find(player => player.playerId === val)
		notifyInfo("The host left, a new host has been assigned: " + newHost.playerName)
	}
}

function publicRoomsAddWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return

	if (val.settings.public !== "on" || val.state !== SERVER_STATES.lobby) return

	store.dispatch(
		addRoom({
			serverId: snapshot.key,
			roomName: val.settings.roomName,
		})
	)
}

function publicRoomsRemoveWatcher(snapshot) {
	store.dispatch(removeRoom(snapshot.key))
}

let isWatching = false

export function addPublicRoomsWatcher() {
	if (isWatching) return
	db.ref(`rooms`).on("child_added", publicRoomsAddWatcher)
	db.ref(`rooms`).on("child_removed", publicRoomsRemoveWatcher)
	isWatching = true
}

export function removePublicRoomsWatcher() {
	if (!isWatching) return
	db.ref(`rooms`).off("child_added", publicRoomsAddWatcher)
	db.ref(`rooms`).off("child_removed", publicRoomsRemoveWatcher)
	isWatching = false
}
