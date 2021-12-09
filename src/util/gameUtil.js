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

export async function updateNextRound(serverId, nextRound) {
	await db.ref(`rooms/${serverId}/game/currentRound`).set(nextRound)
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

/**
 * Stores the selected answer by the player in database under playerAnswer -> correctAnswer?
 *
 * @param {*} serverId The ID for the room that the participant is playing in.
 * @param {*} playerId The ID for the player selecting an answer
 * @param {boolean} correctAnswer If the selected answer is correct or not
 */

export async function setNewAnswerForPlayer(serverId, playerId, correctAnswer, addedScore, answeredRandomly) {
	await db.ref(`rooms/${serverId}/game/currentQuestion/playerAnswers/${playerId}`).set({
        playerId,
        correctAnswer,
        answeredRandomly,
        addedScore,
    })


}

export async function setNewScoreForPlayer(serverId, playerId, newScore) {
	await db.ref(`rooms/${serverId}/players/${playerId}/score`).set(newScore)
}
	



// Helper util to clear current question in firebase
export async function removeCurrentQuestionAndAnswers(serverId) {
	await db.ref(`rooms/${serverId}/game/currentQuestion`).remove()
}