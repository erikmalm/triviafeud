import { nanoid } from "nanoid"

import { db, getValueFromDb } from "../api/fireSource"

//     const playersNoAnswer = serverState.players.filter(player => !playerAnswers.some(answer => answer.playerId === player.playerId))

export const SERVER_STATES = Object.freeze({
	lobby: "lobby",
	ongoing: "ongoing",
})

// import { ref, onValue } from "firebase/database"

export const PLAYER_TEMPLATE = {
	role: "player",
	score: 0,
	ready: false,
	emoji: null,
	playerId: null,
	playerName: null,
}

export function decodePublicRooms(vals) {
	const publicRooms = Object.entries(vals)
		.map(([serverId, { state, settings }]) => ({
			state,
			settings,
			serverId,
		}))
		.filter(room => room.settings.public === "on" && room.state === SERVER_STATES.lobby)

	return publicRooms
}

// Creates a new room
export async function createRoom(defaultSettings) {
	const serverId = nanoid()

	// Creates a new room using nanoID() generated room id
	await db.ref(`rooms/${serverId}`).set({
		players: [],
		state: SERVER_STATES.lobby, // allows players to join
		settings: defaultSettings,
	})

	return serverId
}

/**
 *
 * @returns
 */
// allows the user to join a specific room
export async function joinRoom(player, serverId) {
	// fetch room ref from database
	const state = await getValueFromDb(`rooms/${serverId}/state`)

	if (state === null) throw new Error("room does not exist")
	if (state !== SERVER_STATES.lobby) throw new Error("Game has already begun")

	// fetch the current players in the room
	const players = await getValueFromDb(`rooms/${serverId}/players`)

	// Iterate over object players to check if player name already exists
	for (const otherPlayer in players)
		if (players[otherPlayer].playerName === player.playerName)
			throw new Error("There is already a player with that name")

	await db.ref(`rooms/${serverId}/players/${player.playerId}`).set(player)

	if (player.role === "host") await db.ref(`rooms/${serverId}/host`).set(player.playerId)
}

export async function setServerState(serverId, state) {
	await db.ref(`rooms/${serverId}/state`).set(state)
}

export async function assignHost(playerId, serverId) {
	await db.ref(`rooms/${serverId}/players/${playerId}/role`).set("host")
	await db.ref(`rooms/${serverId}/host`).set(playerId)
}

/**
 *
 * @param {*} playerId
 * @param {*} serverId
 */

export async function removePlayer(playerId, serverId) {
	await db.ref(`rooms/${serverId}/players/${playerId}`).remove()

	const players = await getValueFromDb(`rooms/${serverId}/players`)
	if (players === null) await dismantleServer(serverId)
}
/**
 * dismantles the server
 * @serverId the id of the server
 */
async function dismantleServer(serverId) {
	await db.ref(`rooms/${serverId}`).remove()
	// Server dismantled
}
