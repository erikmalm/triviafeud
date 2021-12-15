import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
	initializeGame,
	initializeQuestionDrafting,
	setNewAnswerForPlayer,
	removeCurrentQuestionAndAnswers,
	updateGameState,
	updateNextRound,
	GAME_STATES,
	setNewScoreForPlayer,
} from "../../util/gameUtil"

import { formatQuestion, saveQuestionToFirebase } from "../../util/questionUtil"

import { getQuestions } from "../../api/questionSource"

import { setServerState, SERVER_STATES } from "../../util/serverUtil"

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
		await setServerState(server.id, SERVER_STATES.ongoing)
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
			await initializeQuestionDrafting(server.id, randomPlayer)
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
	async ({ correctAnswer, answeredRandomly }, { getState, rejectWithValue }) => {
		try {
			const { server, player, game } = getState()

			const scoreMultiplier = (new Date(game.gameTimer) - Date.now()) / game.gameTimerStart
			const addedScore = correctAnswer ? Math.round(scoreMultiplier * 20) + 80 : 0

			const newScore = player.score + addedScore

			await setNewAnswerForPlayer(server.id, player.playerId, correctAnswer, addedScore, answeredRandomly)
			await setNewScoreForPlayer(server.id, player.playerId, newScore)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

//
//

// const addedScore = (scoreMultiplier * 100) + 50

export const clearCurrentQuestion = createAsyncThunk("answer/clear", async (_, { rejectWithValue, getState }) => {
	const { server } = getState()
	try {
		await removeCurrentQuestionAndAnswers(server.id)
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
	const { server } = getState()
	try {
		await updateNextRound(server.id, round)
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
				alert(action.payload)
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
