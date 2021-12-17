import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
	initializeGame,
	setNewAnswerForPlayer,
	updateGameState,
	GAME_STATES,
	setNewScoreForPlayer,
	setNewNumberOfCorrectAnswersForPlayer,
} from "../../util/gameUtil"

import { db } from "../../api/fireSource"

import { formatQuestion, saveQuestionToFirebase } from "../../util/questionUtil"

import { getQuestions } from "../../api/questionSource"

import { SERVER_STATES } from "../../util/serverUtil"

import { FIRST_TO_ANSWER } from "../../util/settingsUtil"
import { notifyError } from "../../components/notification"

const INITIAL_STATE = {
	currentRound: null,
	gameState: null, // Any of the GAME_STATES
	currentDrafter: null,
	currentQuestion: {
		question: null,
	},
	playerAnswers: [],
	gameTimer: null,
	gameTimerStart: null,
}

export const startGame = createAsyncThunk("game/start", async (_, { rejectWithValue, getState }) => {
	try {
		const { server } = getState()
		const gameState = await initializeGame(server.id)
		await db.ref(`rooms/${server.id}/state`).set(SERVER_STATES.ongoing)
		return gameState
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const startQuestionDrafting = createAsyncThunk(
	"game/questiondraft/start",
	async (_, { rejectWithValue, getState }) => {
		try {
			const { server } = getState()
			const randomPlayer = server.players[Math.floor(Math.random() * server.players.length)]

			await db.ref(`rooms/${server.id}/game/currentDrafter`).set(randomPlayer.playerId)

			updateGameState(server.id, GAME_STATES.questionDraft)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const startLoadingQuestions = createAsyncThunk(
	"game/loadQuestions/start",
	async (_, { rejectWithValue, getState }) => {
		const { server } = getState()
		try {
			const [question] = await getQuestions({})

			await saveQuestionToFirebase(server.id, formatQuestion(question))

			await updateGameState(server.id, GAME_STATES.question)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const answerIsSelected = createAsyncThunk(
	"answer/select",
	async ({ correctAnswer, answeredRandomly, answerTime }, { getState, rejectWithValue }) => {
		try {
			const { server, player, game, settings } = getState()

			const scoreMultiplier = (new Date(game.gameTimer) - Date.now()) / game.gameTimerStart
			const addedScore =
				settings.gamemode === FIRST_TO_ANSWER || !correctAnswer ? 0 : Math.round(scoreMultiplier * 20) + 80

			await setNewAnswerForPlayer(
				server.id,
				player.playerId,
				correctAnswer,
				addedScore,
				answeredRandomly,
				answerTime
			)
			if (addedScore > 0) await setNewScoreForPlayer(server.id, player.playerId, player.score + addedScore)

			if (settings.gamemode !== FIRST_TO_ANSWER && correctAnswer === true) {
				await setNewNumberOfCorrectAnswersForPlayer(server.id, player.playerId, player.correctAnswers + 1)
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const clearCurrentQuestion = createAsyncThunk("answer/clear", async (_, { rejectWithValue, getState }) => {
	const serverId = getState().server.id
	try {
		await db.ref(`rooms/${serverId}/game/currentQuestion`).remove()
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const setGlobalGameState = createAsyncThunk(
	"gameState/set",
	async (gameState, { rejectWithValue, getState }) => {
		const { server } = getState()
		try {
			await updateGameState(server.id, gameState)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const updateCurrentRound = createAsyncThunk("game/nextRound", async (round, { rejectWithValue, getState }) => {
	const serverId = getState().server.id
	try {
		await db.ref(`rooms/${serverId}/game/currentRound`).set(round)
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const gameSlice = createSlice({
	name: "game",
	initialState: { ...INITIAL_STATE },
	reducers: {
		setCurrentRound: (state, { payload }) => {
			state.currentRound = payload
		},
		setGameState: (state, { payload }) => {
			state.gameState = payload
		},
		setCurrentDrafter: (state, { payload }) => {
			state.currentDrafter = payload
		},
		setCurrentQuestion: (state, { payload }) => {
			state.currentQuestion = payload
		},
		setGameTimer: (state, { payload }) => {
			state.gameTimer = payload
			state.gameTimerStart = payload == null ? null : new Date(payload) - Date.now()
		},
		setNewQuestion: (state, { payload }) => {
			state.currentQuestion.question = payload
		},
		setPlayerAnswers: (state, { payload }) => {
			state.playerAnswers = payload
		},
		resetCurrentQuestion: state => {
			state.currentQuestion = null
			state.playerAnswers = []
		},
		resetGame: () => {
			return { ...INITIAL_STATE }
		},
	},
	extraReducers: builder => {
		builder
			.addCase(startGame.pending, state => {
				state.gameState = GAME_STATES.waiting
			})
			.addCase(startGame.fulfilled, (state, { payload }) => {
				return {
					...state,
					...payload,
				}
			})
			.addCase(startGame.rejected, (state, action) => {
				alert(action.payload)
			})
			.addCase(startQuestionDrafting.pending, state => {
				state.gameState = GAME_STATES.waiting
			})
			.addCase(startQuestionDrafting.rejected, (state, action) => {
				notifyError(action.payload)
			})
			.addCase(answerIsSelected.pending, (state, action) => {
				state.gameState = GAME_STATES.waiting
			})
			.addCase(answerIsSelected.fulfilled, (state, action) => {
				state.gameState = GAME_STATES.waitingForPlayers
			})
	},
})

export const {
	setCurrentRound,
	setGameState,
	setCurrentDrafter,
	setGameTimer,
	setNewQuestion,
	setPlayerAnswers,
	resetCurrentQuestion,
	resetGame,
} = gameSlice.actions

export default gameSlice.reducer
