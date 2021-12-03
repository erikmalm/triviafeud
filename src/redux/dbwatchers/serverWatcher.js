import { db } from "../../api/fireSource"

import { setPlayers, setState } from "../reducers/serverSlice"

import { setKicked } from "../reducers/playerSlice"

import { decodePlayers } from "../../util/serverUtil"

import store from "../store"

/**
 * Keeps track of the players in the game
 * game vals
 */
export function addServerWatchers() {
	addPlayersWatcher()
	addStateWatcher()
	addKickedWatcher()
}

export function removeServerWatchers() {
	removePlayersWatcher()
	removeStateWatcher()
	removeKickedWatcher()
}

function playersWatcher(snapshot) {
    const vals = snapshot.val()
	if (vals === null) return
	store.dispatch(setPlayers(decodePlayers(vals)))
}

/**
 * Adds a players watcher
 * Dispatches decoded players to the store
 */
export function addPlayersWatcher() {
    const serverId = store.getState().server.id
    db.ref(`rooms/${serverId}/players`).on("value", playersWatcher)
}

/**
 * Adds a players watcher
 * Dispatches decoded players to the store
 */
export function removePlayersWatcher() {
    const serverId = store.getState().server.id
    db.ref(`rooms/${serverId}/players`).off("value", playersWatcher)
}

function stateWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setState(val))
}

/**
 * Adds a state watcher
 * Ensures that correct state for the game is watched
 */
function addStateWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/state`).on("value", stateWatcher)
}

/**
 * Adds a state watcher
 * Ensures that correct state for the game is watched
 */
function removeStateWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/state`).off("value", stateWatcher)
}

function kickedWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	const playerId = store.getState().player.playerId
	if(val.playerId === playerId) {
		store.dispatch(setKicked(true))
	}
}

function addKickedWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/players`).on("child_removed", kickedWatcher)
}

function removeKickedWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/players`).off("child_removed", kickedWatcher)
}