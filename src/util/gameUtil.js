import { db } from "../api/fireSource"

export const GAME_STATES = Object.freeze({
	waiting: "WAITING",
	questionDraft: "QUESTION DRAFT",
	questionWaiting: "QUESTION WAITING",
	question: "QUESTION",
	questionResult: "QUESTION RESULT",
	gameResult: "GAME RESULT",
})

export async function updateGameState(serverId, gameState) {
	await db.ref(`rooms/${serverId}/game/gameState`).set(gameState)
}

export async function initializeGame(serverId) {
	const game = {
		gameState: GAME_STATES.waiting,
		currentRound: 1,
	}

	// set game state to waiting
	await db.ref(`rooms/${serverId}/game`).set(game)

	return game
}

export async function initializeQuestionDrafting(serverId, { playerId }) {
	await db.ref(`rooms/${serverId}/game/currentDrafter`).set(playerId)
	await db.ref(`rooms/${serverId}/game/gameState`).set(GAME_STATES.questionDraft)
}
