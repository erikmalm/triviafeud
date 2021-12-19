import store from "../store"

import {
	setCurrentRound,
	setGameState,
	setCurrentDrafter,
	setNewQuestion,
	setPlayerAnswers,
} from "../reducers/gameSlice"

import { handleFirstToAnswer, checkForAutonomousGameActions } from "../../util/autonomousUtil"

import { decodeFirebaseArray } from "../../util/util.js"

import { watch, ignore } from "./watcher"
import { FIRST_TO_ANSWER } from "../../util/settingsUtil"

export function addGameWatchers() {
	watch("game/gameState", "value", gameStateWatcher)
	watch("game/currentDrafter", "value", currentDrafterWatcher)
	watch("game/currentQuestion/question", "value", questionWatcher)
	watch("game/currentRound", "value", currentRoundWatcher)
	watch("game/currentQuestion/playerAnswers", "value", playerAnswerWatcher)
}

export function removeGameWatchers() {
	ignore("game/gameState", "value")
	ignore("game/currentDrafter", "value")
	ignore("game/currentQuestion/question", "value")
	ignore("game/currentRound", "value")
	ignore("game/currentQuestion/playerAnswers", "value")
}

function currentDrafterWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setCurrentDrafter(val))
}

function questionWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setNewQuestion(val))
}

function currentRoundWatcher(snapshot) {
	const val = snapshot.val()
	store.dispatch(setCurrentRound(val))
}

function gameStateWatcher(snapshot) {
	const val = snapshot.val()

	store.dispatch(setGameState(val))

	checkForAutonomousGameActions(val)
}

async function playerAnswerWatcher(snapshot) {
	const val = snapshot.val() || {}

	const answers = decodeFirebaseArray(val)
	store.dispatch(setPlayerAnswers(answers))

	// If player is currently not answering a question or game-mode is not first to answer, return
	if (answers.length !== 0 && store.getState().settings.gamemode === FIRST_TO_ANSWER) {
		handleFirstToAnswer(answers)
	}
}
