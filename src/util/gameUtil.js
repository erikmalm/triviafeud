import { db } from "../api/fireSource"

export const GAME_STATES = Object.freeze({
	waiting: "WAITING",
	questionDraft: "QUESTION DRAFT",
	questionWaiting: "QUESTION WAITING",
	question: "QUESTION",
	roundResults: "ROUND RESULTS",
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

export async function setNewAnswerForPlayer(
	serverId,
	playerId,
	correctAnswer,
	addedScore,
	answeredRandomly,
	answerTime
) {
	await db.ref(`rooms/${serverId}/game/currentQuestion/playerAnswers/${playerId}`).set({
		playerId,
		correctAnswer,
		answeredRandomly,
		addedScore,
		answerTime,
	})
}

export async function setNewScoreForPlayer(serverId, playerId, newScore) {
	await db.ref(`rooms/${serverId}/players/${playerId}/score`).set(newScore)
}

export async function setNewNumberOfCorrectAnswersForPlayer(serverId, playerId, newNumberOfCorrectAnswers) {
	await db.ref(`rooms/${serverId}/players/${playerId}/correctAnswers`).set(newNumberOfCorrectAnswers)
}
