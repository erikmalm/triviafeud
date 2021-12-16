import store from "../redux/store"

import { resetServer, assignNewGameHost, kickPlayer } from "../redux/reducers/serverSlice"
import { resetPlayer } from "../redux/reducers/playerSlice"
import { resetGame } from "../redux/reducers/gameSlice"
import { resetSettings } from "../redux/reducers/settingsSlice"
import { history } from "../components/routing"

import { removeGameWatchers } from "../redux/dbwatchers/gameWatcher"
import { removeServerWatchers } from "../redux/dbwatchers/serverWatcher"

import BAD_WORDS from "../api/words"

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Deodes the object players in a server
 * and returns an array of the players
 * @param {*} array object in server
 */

export function decodeFirebaseArray(array) {
	return Object.entries(array).map(entry => entry[1])
}

export async function leaveServer() {
	const { server, player } = store.getState()
	removeServerWatchers()
	removeGameWatchers()
	if (player.role === "host" && server.players.length > 1) {
		await store.dispatch(assignNewGameHost())
	}
	await store.dispatch(kickPlayer(player.playerId))

	resetAndLeave()
}

export function resetAndLeave() {
	history.push("/")
	store.dispatch(resetServer())
	store.dispatch(resetPlayer())
	store.dispatch(resetGame())
	store.dispatch(resetSettings())
}

export function countWords(str) {
	str = str.replace(/(^\s*)|(\s*$)/gi, "")
	str = str.replace(/[ ]{2,}/gi, " ")
	str = str.replace(/\n /, "\n")
	return str.split(" ").length
}

const badWordsString = BAD_WORDS.join(" ")

export function containsBadWords(string) {
	return string
		.trim()
		.toLowerCase()
		.split(/[\s-,_]/)
		.some(part => part.length > 3 && badWordsString.indexOf(part + " ") > -1)
}
