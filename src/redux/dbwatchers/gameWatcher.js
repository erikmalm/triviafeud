import { db } from "../../api/fireSource"

import store from "../store"

import { addPlayersWatcher, removePlayersWatcher } from "./serverWatcher"

import { setCurrentRound, setGameState, setCurrentDrafter, setNewQuestion } from "../reducers/gameSlice"
import { GAME_STATES } from "../../util/gameUtil"

import { getCandidateQuestions } from "../reducers/questionDraftSlice"

export function addGameWatchers() {
	addPlayersWatcher()
	addGameStateWatcher()
	addCurrentDrafterWatcher()
	addQuestionWatcher()
	addCurrentRoundWatcher()
}

export function removeGameWatchers() {
	removePlayersWatcher()
	removeGameStateWatcher()
	removeCurrentDrafterWatcher()
	removeQuestionWatcher()
	removeCurrentRoundWatcher()
}

function gameStateWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setGameState(val))

	/* current best solution to check for actions
    depending on game state changes */
	checkForFurtherActions(val)
}

function checkForFurtherActions(newState) {
	if (
		newState === GAME_STATES.questionDraft &&
		store.getState().player.playerId === store.getState().game.currentDrafter
	)
		store.dispatch(getCandidateQuestions())
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
	if (val === null) return
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
	if (val === null) return
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

function currentRoundWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
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
