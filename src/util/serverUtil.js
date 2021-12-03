import { nanoid } from "nanoid"

import { db, getValueFromDb } from "../api/fireSource"

export const SERVER_STATES = Object.freeze({
	lobby: "lobby",
	ongoing: "ongoing",
})

// import { ref, onValue } from "firebase/database"

/* TODO FETCH FROM API LATER */
export const CATEGORIES = [
	{ id: 9, name: "General Knowledge" },
	{ id: 10, name: "Entertainment: Books" },
	{ id: 11, name: "Entertainment: Film" },
	{ id: 12, name: "Entertainment: Music" },
	{ id: 13, name: "Entertainment: Musicals & Theatres" },
	{ id: 14, name: "Entertainment: Television" },
	{ id: 15, name: "Entertainment: Video Games" },
	{ id: 16, name: "Entertainment: Board Games" },
	{ id: 17, name: "Science & Nature" },
	{ id: 18, name: "Science: Computers" },
	{ id: 19, name: "Science: Mathematics" },
	{ id: 20, name: "Mythology" },
	{ id: 21, name: "Sports" },
	{ id: 22, name: "Geography" },
	{ id: 23, name: "History" },
	{ id: 24, name: "Politics" },
	{ id: 25, name: "Art" },
	{ id: 26, name: "Celebrities" },
	{ id: 27, name: "Animals" },
	{ id: 28, name: "Vehicles" },
	{ id: 29, name: "Entertainment: Comics" },
	{ id: 30, name: "Science: Gadgets" },
	{ id: 31, name: "Entertainment: Japanese Anime & Manga" },
	{ id: 32, name: "Entertainment: Cartoon & Animations" },
]

// Settings to be set when a room is created
export const DEFAULT_SETTINGS = {
	nrOfRound: 24,
	category: null,
	gamemode: "standard",
	difficulty: "medium",
	speed: "standard",
}

export const PLAYER_TEMPLATE = {
	role: "player",
	score: 0,
	ready: false,
	emoji: null,
	playerId: null,
	playerName: null,
}

// Creates a new room
export async function createRoom() {
	const serverId = nanoid()

	// Creates a new room using nanoID() generated room id
	await db.ref(`rooms/${serverId}`).set({
		players: [],
		state: SERVER_STATES.lobby, // allows players to join
		settings: DEFAULT_SETTINGS,
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

/**
 * Deodes the object players in a server
 * and returns an array of the players
 * @param {*} players object in server
 */

export function decodePlayers(players) {
	return Object.entries(players).map(entry => entry[1])
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

export async function updateServerSettings(settings, serverId) {
	await db.ref(`rooms/${serverId}/settings`).set(settings)
}
