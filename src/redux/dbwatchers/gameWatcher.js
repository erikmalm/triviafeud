import { db } from "../../api/fireSource"

import store from "../store"

import { addPlayersWatcher, removePlayersWatcher } from "./serverWatcher"

import {
	setCurrentRound,
	setGameState,
	setCurrentDrafter,
	setNewQuestion,
	setPlayerAnswers,
	setGlobalGameState,
	startQuestionDrafting,
	startLoadingQuestions,
	clearCurrentQuestion,
	setGameTimer,
	updateCurrentRound,
	answerIsSelected,
} from "../reducers/gameSlice"
import { GAME_STATES, setNewScoreForPlayer, setNewAnswerForPlayer } from "../../util/gameUtil"

import { calculateQuestionTimeout } from "../../util/questionUtil"

import { getCandidateQuestions } from "../reducers/questionDraftSlice"

import { decodeFirebaseArray } from "../../util/util.js"



export function addGameWatchers() {
	addPlayersWatcher()
	addGameStateWatcher()
	addCurrentDrafterWatcher()
	addQuestionWatcher()
	addCurrentRoundWatcher()
	addPlayerAnswersWatcher()
}

export function removeGameWatchers() {
	removePlayersWatcher()
	removeGameStateWatcher()
	removeCurrentDrafterWatcher()
	removeQuestionWatcher()
	removeCurrentRoundWatcher()
	removePlayerAnswersWatcher()
}

function gameStateWatcher(snapshot) {
	const val = snapshot.val()

	store.dispatch(setGameState(val))

	checkForAutonomousGameActions(val)
}

function checkForAutonomousGameActions(newState) {
	const player = store.getState().player

	switch (newState) {
		case GAME_STATES.questionDraft:
			if (player.playerId === store.getState().game.currentDrafter) store.dispatch(getCandidateQuestions())
			break
		case GAME_STATES.question:
			const questionState = store.getState().game.currentQuestion.question
			const settingsState = store.getState().settings
			const timeOut = calculateQuestionTimeout(questionState, settingsState)
			store.dispatch(setGameTimer(new Date(Date.now() + timeOut).toString()))
			setTimeout(handleNoAnswer, timeOut)
			break
		case GAME_STATES.roundResults:
			const waitTime = 10000
			store.dispatch(setGameTimer(new Date(Date.now() + waitTime).toString()))
			setTimeout(() => store.dispatch(setGameTimer(null)), waitTime)

			if (player.role === "host") setTimeout(startNextRound, waitTime)
			break
		default:
			break
	}
}

async function handleNoAnswer() {
	// Check if timeout is still needed
	if (store.getState().game.gameState !== GAME_STATES.question) return

	// Send to waiting (normal procedure for handle answer)
	store.dispatch(setGameState(GAME_STATES.waiting))
	store.dispatch(setGameTimer(null))

	// dispatch user answer with status on correct server for the current player
	await store.dispatch(answerIsSelected({ correctAnswer: false, answeredRandomly: false, answerTime: 99999 }))

	// Wait for the other players
	store.dispatch(setGameState(GAME_STATES.waitingForPlayers))
}


async function startNextRound() {
	// Check if timeout is still needed
	if (store.getState().game.gameState !== GAME_STATES.roundResults) return

	const gameState = store.getState().game
	const settingsState = store.getState().settings

	if (gameState.currentRound >= settingsState.numberOfRounds) {
		await store.dispatch(setGlobalGameState(GAME_STATES.gameResult))
		return
	}

	await store.dispatch(setGlobalGameState(GAME_STATES.waiting))

	await store.dispatch(updateCurrentRound(gameState.currentRound + 1))
	await store.dispatch(clearCurrentQuestion())

	if (settingsState.questionDrafting === "on") await store.dispatch(startQuestionDrafting())
	else await store.dispatch(startLoadingQuestions())
}

function addGameStateWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/gameState`).on("value", gameStateWatcher)
}

function removeGameStateWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/gameState`).off("value", gameStateWatcher)
}

function currentDrafterWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setCurrentDrafter(val))
}

function addCurrentDrafterWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentDrafter`).on("value", currentDrafterWatcher)
}

function removeCurrentDrafterWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentDrafter`).off("value", currentDrafterWatcher)
}

function questionWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setNewQuestion(val))
}

function addQuestionWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentQuestion/question`).on("value", questionWatcher)
}

function removeQuestionWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentQuestion/question`).off("value", questionWatcher)
}

/*

function scoreWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setNewScore(val))
}

function addQuestionWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentQuestion/question`).on("value", questionWatcher)
}

function removeQuestionWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentQuestion/question`).off("value", questionWatcher)
}

*/

async function playerAnswerWatcher(snapshot) {
	const val = snapshot.val() || {}

	const answers = decodeFirebaseArray(val)
	store.dispatch(setPlayerAnswers(answers))

	// If player is currently not answering a question or game-mode is not first to answer, return
	if (answers.length !== 0 && store.getState().settings.gamemode === "first-to-answer") {
		handleFirstToAnswer(answers)
	}
}

async function handleFirstToAnswer(answers) {
	const { playerId, role } = store.getState().player
	const game = store.getState().game

	// Check if there are answers and that answer is correct
	// Or if all players have answered (incorrectly)
	if ((game.playerAnswers && game.playerAnswers.some(({ correctAnswer }) => correctAnswer === true))) {
		if (!answers.some(answer => answer.playerId === playerId)) handleNoAnswer()

		if (role === "host") {
			await new Promise(resolve => setTimeout(resolve, 500))
			if (answers.length === store.getState().game.playerAnswers.length) {

				const playerWithCorrectAnswer = answers
                    .filter(answer => answer.correctAnswer === true)
                    .sort((a, b) => a.answerTime - b.answerTime)[0]

                if (playerWithCorrectAnswer.addedScore > 0) return // This function has already been used

				setNewAnswerForPlayer(
					store.getState().server.id,
					playerWithCorrectAnswer.playerId,
					true,
					100,
					playerWithCorrectAnswer.answeredRandomly,
					playerWithCorrectAnswer.answerTime
				)

				setNewScoreForPlayer(
					store.getState().server.id, 
					playerWithCorrectAnswer.playerId, 
					store.getState().server.players.find(player => player.playerId === playerWithCorrectAnswer.playerId).score + 100
				)				
				// Calculate score for the player who got right first
				// Set global gamestate to round results
				// const playersNoAnswer = serverState.players.filter(player => !playerAnswers.some(answer => answer.playerId === player.playerId))
			}
		}
	} else if(answers.length === store.getState().server.players.length) {
        //do shit
    }
}

function addPlayerAnswersWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentQuestion/playerAnswers`).on("value", playerAnswerWatcher)
}

function removePlayerAnswersWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentQuestion/playerAnswers`).off("value", playerAnswerWatcher)
}

function currentRoundWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setCurrentRound(val))
}

function addCurrentRoundWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentRound`).on("value", currentRoundWatcher)
}

function removeCurrentRoundWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/game/currentRound`).off("value", currentRoundWatcher)
}
