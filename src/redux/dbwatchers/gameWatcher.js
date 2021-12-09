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
    clearCurrentQuestion,
    setGameTimer,
	updateCurrentRound,
    answerIsSelected
} from "../reducers/gameSlice"
import { GAME_STATES } from "../../util/gameUtil"

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

	switch(newState) {
		case GAME_STATES.questionDraft:
			if(player.playerId === store.getState().game.currentDrafter)
				store.dispatch(getCandidateQuestions())
			break;
		case GAME_STATES.question:
			const timeOut = 10000
			store.dispatch(setGameTimer(new Date(Date.now() + timeOut).toString()))
			setTimeout(() => handleNoAnswer(), timeOut)
			break;
		case GAME_STATES.roundResults:
			const waitTime = 10000
			store.dispatch(setGameTimer(new Date(Date.now() + waitTime).toString()))
	
			if(player.role === "host")
				setTimeout(startNextRound, waitTime)
			break;
		default: break;
	}
}

async function handleNoAnswer() {

	// If user has answered, return
	if ( store.getState().game.gameState !== 'QUESTION') return

	// Send to waiting (normal procedure for handle answer)
	store.dispatch(setGameState(GAME_STATES.waiting))

	// dispatch user answer with status on correct server for the current player
	await store.dispatch(answerIsSelected({correctAnswer: false, answeredRandomly: false}))

	// Wait for the other players
	store.dispatch(setGameState(GAME_STATES.waitingForPlayers))
}

// console.log(store)
// const settingsState = store.getState().settings
// console.log(settingsState)

// if (game.currentRound >= settingsState.nrOfRounds) store.dispatch(setGlobalGameState(GAME_STATES.gameResult))

// console.log(gameState.currentRound)
// console.log(settingsState.nrOfRounds)

async function startNextRound() {
	const gameState = store.getState().game
	const settingsState = store.getState().settings	

	if (gameState.currentRound >= (settingsState.nrOfRounds)) {
		await store.dispatch(setGlobalGameState(GAME_STATES.gameResult))
		return
	}

    await store.dispatch(setGlobalGameState(GAME_STATES.waiting))

	await store.dispatch(updateCurrentRound(gameState.currentRound + 1))

    await store.dispatch(clearCurrentQuestion())

    await store.dispatch(startQuestionDrafting())
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

function playerAnswerWatcher(snapshot) {
	const val = snapshot.val() || []

	store.dispatch(setPlayerAnswers(decodeFirebaseArray(val)))
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
