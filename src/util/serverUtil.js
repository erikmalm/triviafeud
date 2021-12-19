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
	correctAnswers: 0,
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

/**
 *
 * @returns
 */
// allows the user to join a specific room
export async function joinRoom({ player, serverId }) {
	// fetch room ref from database
	const state = await getValueFromDb(`rooms/${serverId}/state`)

	if (state === null) throw new Error("room does not exist")
	if (state !== SERVER_STATES.lobby) throw new Error("Game has already begun")

	// fetch the current players in the room
	const players = await getValueFromDb(`rooms/${serverId}/players`)

	if (players && Object.keys(players).length > 12) throw new Error("Game is full")

	// Iterate over object players to check if player name already exists
	for (const otherPlayer in players)
		if (players[otherPlayer].playerName === player.playerName)
			throw new Error("There is already a player with that name")

	await db.ref(`rooms/${serverId}/players/${player.playerId}`).set(player)

	if (player.role === "host") await db.ref(`rooms/${serverId}/host`).set(player.playerId)
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
}
