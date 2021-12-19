import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { joinRoom, PLAYER_TEMPLATE, SERVER_STATES, removePlayer, assignHost } from "../../util/serverUtil"
import { nanoid } from "nanoid"

import { db } from "../../api/fireSource"

import { notifyError } from "../../components/notification"

import { API_STATES } from "../../api"

// API_URL
/* https://opentdb.com/api.php?amount=1 */

// Async Thunk to return a Sync call using Middleware
export const hostNewGame = createAsyncThunk(
	"server/host",
	async ({ userName, publicRoom }, { rejectWithValue, getState }) => {
		const defaultSettings = getState().settings
		try {
			const serverId = nanoid()

			await db.ref(`rooms/${serverId}`).set({
				players: [],
				state: SERVER_STATES.lobby,
				settings: {
					...defaultSettings,
					public: publicRoom,
					roomName: userName + "'s room",
				},
			})

			const player = {
				...PLAYER_TEMPLATE,
				role: "host",
				playerId: nanoid(),
				playerName: userName,
			}

			await joinRoom({ player, serverId })

			return { serverId, playerId: player.playerId }
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const joinGame = createAsyncThunk("server/join", async ({ userName, serverId }, { rejectWithValue }) => {
	const player = {
		...PLAYER_TEMPLATE,
		playerId: nanoid(),
		playerName: userName,
	}

	try {
		await joinRoom({ player, serverId })
	} catch (e) {
		return rejectWithValue(e.message)
	}
	return { serverId, playerId: player.playerId }
})

export const kickPlayer = createAsyncThunk("server/kick", async (playerId, { rejectWithValue, getState }) => {
	try {
		const { server } = getState()
		await removePlayer(playerId, server.id)
		return true
	} catch (e) {
		console.error(e)
		return rejectWithValue(e)
	}
})

export const assignNewGameHost = createAsyncThunk("server/assign/host", async (_, { rejectWithValue, getState }) => {
	try {
		const { server } = getState()
		const candidateHosts = server.players.filter(player => player.role !== "host")

		const randomPlayer = candidateHosts[Math.floor(Math.random() * candidateHosts.length)]
		await assignHost(randomPlayer.playerId, server.id)
	} catch (e) {
		return rejectWithValue(e)
	}
})

const INITIAL_STATE = {
	id: null, // Identity of the server/room
	players: [], // Holds "player object"s | See what people that have joined
	state: null, // State of the room, "lobby" | "ongoing?"
	host: null,
    status: null,
}

export const serverSlice = createSlice({
	name: "server",
	initialState: { ...INITIAL_STATE },
	reducers: {
		setPlayers: (state, action) => {
			state.players = action.payload
		},
		setState: (state, action) => {
			state.state = action.payload
		},
		setHost: (state, action) => {
			state.host = action.payload
		},
		resetServer: () => {
			return { ...INITIAL_STATE }
		},
	},
	extraReducers: builder => {
		builder
			/* HostGame */
			.addCase(hostNewGame.pending, state => {
                state.status = API_STATES.PENDING
			})
			.addCase(hostNewGame.fulfilled, (state, { payload }) => {
				const { serverId } = payload
                state.status = API_STATES.SUCCESS
				state.id = serverId
			})
			.addCase(hostNewGame.rejected, (state, action) => {
				notifyError(action.payload)
                state.status = API_STATES.ERROR
			})

			/* Join game */
			.addCase(joinGame.pending, state => {
                state.status = API_STATES.PENDING
			})
			.addCase(joinGame.fulfilled, (state, { payload }) => {
				const { serverId } = payload
                state.status = API_STATES.SUCCESS
				state.id = serverId
			})
			.addCase(joinGame.rejected, (state, action) => {
                state.status = API_STATES.ERROR
				notifyError("Could not join game: " + action.payload)
			})

			/* Kick player */
			.addCase(kickPlayer.rejected, (state, action) => {
				notifyError("Could not kick player" + action.payload)
			})
            
			.addCase(assignNewGameHost.rejected, (state, action) => {
				notifyError("Could not assign new host: " + action.payload)
			})
	},
})

// Action creators are generated for each case reducer function
export const { setPlayers, setState, resetServer, setHost } = serverSlice.actions

export default serverSlice.reducer
