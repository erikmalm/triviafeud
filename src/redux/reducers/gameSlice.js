import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
	initializeGame,
	initializeQuestionDrafting,
	setNewAnswerForPlayer,
	removeCurrentQuestionAndAnswers,
	updateGameState,
	updateNextRound
} from "../../util/gameUtil"

import { setServerState, SERVER_STATES } from "../../util/serverUtil"

// For some reason I only manage to store this value in gameState -> playerAnswers
// https://www.pluralsight.com/guides/deeply-nested-objectives-redux
// To fix later...!

const INITIAL_STATE = {
	currentRound: null,
	gameState: null, // Any of the GAME_STATES
	currentDrafter: null,
	currentQuestion: {
		question: null,
	},
	playerAnswers: [],
	gameTimer: null,
    gameTimerStart: null
}

export const startGame = createAsyncThunk("game/start", async (serverId, { rejectWithValue }) => {
	try {
		const gameState = await initializeGame(serverId)
		await setServerState(serverId, SERVER_STATES.ongoing)
		return gameState
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const startQuestionDrafting = createAsyncThunk(
	"game/questiondraft/start",
	async ({ serverId, players }, { rejectWithValue }) => {
		console.log("Trying to start question drafting")
		try {
			const randomPlayer = players[Math.floor(Math.random() * players.length)]
			await initializeQuestionDrafting(serverId, randomPlayer)
			return randomPlayer
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const answerIsSelected = createAsyncThunk(
	"answer/select",
	async ({ serverId, playerId, correctAnswer }, { rejectWithValue }) => {
		try {
			await setNewAnswerForPlayer(serverId, playerId, correctAnswer)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const clearCurrentQuestion = createAsyncThunk("answer/clear", async ({ serverId }, { rejectWithValue }) => {
	try {
		await removeCurrentQuestionAndAnswers(serverId)
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const setGlobalGameState = createAsyncThunk(
	"gameState/set",
	async ({ serverId, gameState }, { rejectWithValue }) => {
		try {
			await updateGameState(serverId, gameState)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const setNextRound = createAsyncThunk(
	"game/nextRound",
	async ({ serverId, currentRound }, {rejectWithValue}) => {
		try {
			await updateNextRound(serverId, currentRound + 1)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

/*

Defined in serverSlice
    id: null, // Identity of the server/room
    players: null, // Holds "player object"s | See what people that have joined
    settings: null, // Hold the "settings object" | Settings for the current room
    state: null, // State of the room, "lobby" | "ongoing?"
*/

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
            state.gameTimerStart = new Date(payload) - Date.now()
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
	},
	extraReducers: builder => {
		builder
			.addCase(startGame.pending, (state, action) => {
				console.log("Trying to start game 1")
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
			.addCase(startQuestionDrafting.pending, (state, action) => {
				console.log("Trying to start questiondrafting 1")
			})
			.addCase(startQuestionDrafting.rejected, (state, action) => {
				alert(action.payload)
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
} = gameSlice.actions

export default gameSlice.reducer
