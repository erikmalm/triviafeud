import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { db } from "../../api/fireSource"
import { notifyError } from "../../components/notification"

export const setReady = createAsyncThunk("player/setReady", async (readyState, { rejectWithValue, getState }) => {
	try {
		const { server, player } = getState()
		await db.ref(`rooms/${server.id}/players/${player.playerId}/ready`).set(readyState)
		return readyState
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const setEmoji = createAsyncThunk("player/setEmoji", async (emoji, { rejectWithValue, getState }) => {
	try {
		const { server, player } = getState()
		await db.ref(`rooms/${server.id}/players/${player.playerId}/emoji`).set(emoji)
		return emoji
	} catch (error) {
		return rejectWithValue(error)
	}
})

const INITIAL_STATE = {
	playerId: null, // Identity of the player
	playerName: null, // Name of player
	role: null, // "host" || "player"
	emoji: null, // the emoji that the player has currently selected
	score: 0, // Holds score of the player, no less than inital value
	ready: false, // Holds the boolean to if the player is ready to start the game
	correctAnswers: 0,
}

export const playerSlice = createSlice({
	name: "player",
	initialState: { ...INITIAL_STATE },
	reducers: {
		setPlayer: (state, { payload }) => {
			return {
				...state,
				...payload,
			}
		},
		update: (state, { payload }) => {
			state[payload.state] = payload.value
		},
		resetPlayer: () => {
			return { ...INITIAL_STATE }
		},
	},
	extraReducers: builder => {
		builder
			.addCase(setReady.rejected, (_, { payload }) => {
				notifyError(payload)
			})
			.addCase(setEmoji.rejected, (_, { payload }) => {
				notifyError(payload)
			})
	},
})

// creators are generated for each case reducer function
export const { setPlayer, update, resetPlayer } = playerSlice.actions

export default playerSlice.reducer
