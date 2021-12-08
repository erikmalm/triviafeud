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
	setNextRound,
    answerIsSelected
} from "../reducers/gameSlice"
import { GAME_STATES } from "../../util/gameUtil"

import { getCandidateQuestions } from "../reducers/questionDraftSlice"

import { decodeFirebaseArray } from "../../util/serverUtil"

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

	/* current best solution to check for actions
    depending on game state changes */
	checkForAutonomousGameActions(val)
}


function checkForAutonomousGameActions(newState) {
	const player = store.getState().player
	const server = store.getState().server

	if (newState === GAME_STATES.questionDraft && player.playerId === store.getState().game.currentDrafter) {
		store.dispatch(getCandidateQuestions())
	} else if(newState === GAME_STATES.question) {
		let timeOut = 10000
        store.dispatch(setGameTimer(new Date(Date.now() + timeOut).toString()))
		setTimeout(() => handleNoAnswer({player, server}), timeOut)
    } else if (newState === GAME_STATES.roundResults) {
        const waitTime = 10000
        store.dispatch(setGameTimer(new Date(Date.now() + waitTime).toString()))

        if(player.role === "host")
		    setTimeout(startNextRound, waitTime)
	}
}

async function handleNoAnswer({player, server}) {

	// If user has answered, return
	if ( store.getState().game.gameState != 'QUESTION') return

	// Send to waiting (normal procedure for handle answer)
	store.dispatch(setGameState(GAME_STATES.waiting))

	// dispatch useranswer with status on correct server for the current player
	await store.dispatch(
		answerIsSelected({
			serverId: server.id,
			playerId: player.playerId,
			correctAnswer: false,
			addedScore: 0,
		})
	)

	// Wait for the other players
	store.dispatch(setGameState(GAME_STATES.waitingForPlayers))
}



async function startNextRound() {
    const serverState = store.getState().server
	const gameState = store.getState().game

    await store.dispatch(setGlobalGameState({
        serverId: serverState.id,
        gameState: GAME_STATES.waiting,
    }))

	await store.dispatch(setNextRound({
		serverId: serverState.id,
		currentRound: gameState.currentRound,
	}))
	console.log(gameState.currentRound)

    await store.dispatch(
        clearCurrentQuestion({
            serverId: serverState.id,
        })
    )
    await store.dispatch(
        startQuestionDrafting({
            serverId: serverState.id,
            players: serverState.players,
        })
    )
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
