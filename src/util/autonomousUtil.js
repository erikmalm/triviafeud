import store from "../redux/store"

import {
	setGameState,
	setGameTimer,
	setGlobalGameState,
	updateCurrentRound,
	clearCurrentQuestion,
	startQuestionDrafting,
	startLoadingQuestions,
	answerIsSelected,
} from "../redux/reducers/gameSlice"

import { setNewAnswerForPlayer, setNewNumberOfCorrectAnswersForPlayer, setNewScoreForPlayer } from "./gameUtil"

import { GAME_STATES } from "./gameUtil"

import { getCandidateQuestions } from "../redux/reducers/questionDraftSlice"

import { calculateQuestionTimeout } from "./questionUtil"

import { QUESTION_DRAFTING } from "./settingsUtil"

export function checkForAutonomousGameActions(newState) {
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

export async function startNextRound() {
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

	if (settingsState.gamemode === QUESTION_DRAFTING) await store.dispatch(startQuestionDrafting())
	else await store.dispatch(startLoadingQuestions())
}

export async function handleFirstToAnswer(answers) {
	const { playerId, role } = store.getState().player
	const game = store.getState().game

	// Check if there are answers and that answer is correct
	// Or if all players have answered (incorrectly)
	if (!game.playerAnswers || !game.playerAnswers.some(({ correctAnswer }) => correctAnswer === true)) return

	if (!answers.some(answer => answer.playerId === playerId)) handleNoAnswer()

	if (role !== "host") return // only host should perform actions below

	await new Promise(resolve => setTimeout(resolve, 500))

	if (answers.length === store.getState().game.playerAnswers.length) {
		const playerWithCorrectAnswer = answers
			.filter(answer => answer.correctAnswer === true)
			.sort((a, b) => a.answerTime - b.answerTime)[0]

		if (playerWithCorrectAnswer.addedScore > 0) return // This function has already been used

		const scoreMultiplier = (new Date(game.gameTimer) - Date.now()) / game.gameTimerStart
		const addedScore = Math.round(scoreMultiplier * 30) + 80

		setNewAnswerForPlayer(
			store.getState().server.id,
			playerWithCorrectAnswer.playerId,
			true,
			addedScore,
			playerWithCorrectAnswer.answeredRandomly,
			playerWithCorrectAnswer.answerTime
		)

		const playerWithCorrectAnswerOnServer = store
			.getState()
			.server.players.find(player => player.playerId === playerWithCorrectAnswer.playerId)

		setNewScoreForPlayer(
			store.getState().server.id,
			playerWithCorrectAnswer.playerId,
			playerWithCorrectAnswerOnServer.score + addedScore
		)

		setNewNumberOfCorrectAnswersForPlayer(
			store.getState().server.id,
			playerWithCorrectAnswer.playerId,
			playerWithCorrectAnswerOnServer.correctAnswers + 1
		)
	}
}

export async function handleNoAnswer() {
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
