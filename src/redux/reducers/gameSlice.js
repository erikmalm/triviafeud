import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { initializeGame, initializeQuestionDrafting, setNewAnswerForPlayer } from "../../util/gameUtil"
import { setServerState, SERVER_STATES } from "../../util/serverUtil"

const INITIAL_STATE = {
	currentRound: null,
	gameState: null, // Any of the GAME_STATES
	currentDrafter: null,
	currentQuestion: {
		question: null,
		answers: [],
	},
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
			// save answer to firebase
			// await saveQuestionToFirebase(serverId, question)
			// await updateGameState(serverId, GAME_STATES.question)
			console.log(serverId)
			console.log(playerId)
			console.log(correctAnswer)
			await setNewAnswerForPlayer(serverId, playerId, correctAnswer)
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
		setNewQuestion: (state, { payload }) => {
			state.currentQuestion.question = payload
		},
		setNewAnswer: (state, { payload }) => {
			state.currentQuestion.answer = payload
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

export const { setCurrentRound, setGameState, setCurrentDrafter, setNewQuestion } = gameSlice.actions

export default gameSlice.reducer
