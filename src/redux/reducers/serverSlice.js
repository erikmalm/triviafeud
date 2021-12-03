import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createRoom, joinRoom, PLAYER_TEMPLATE, removePlayer, updateServerSettings } from "../../util/serverUtil"
import { nanoid } from "nanoid"

// API_URL
/* https://opentdb.com/api.php?amount=1 */

// Async Thunk to return a Sync call using Middleware
export const hostNewGame = createAsyncThunk("server/host", async (userName, { rejectWithValue }) => {
	try {
		const serverId = await createRoom()
		const playerObj = {
			...PLAYER_TEMPLATE,
			role: "host",
			playerId: nanoid(),
			playerName: userName,
		}
		await joinRoom(playerObj, serverId)
		return {
			serverId,
			playerObj,
		}
	} catch (e) {
		return rejectWithValue(e)
	}
})

export const joinGame = createAsyncThunk("server/join", async ({ userName, serverId }, { rejectWithValue }) => {
	const playerObj = {
		...PLAYER_TEMPLATE,
		playerId: nanoid(),
		playerName: userName,
	}
	try {
		await joinRoom(playerObj, serverId)
	} catch (e) {
		return rejectWithValue(e.message)
	}
	return {
		serverId,
		playerObj,
	}
})

export const kickPlayer = createAsyncThunk("server/kick", async ({ playerId, serverId }, { rejectWithValue }) => {
    try {
        await removePlayer(playerId, serverId)
        return true
    } catch(e) {
        console.error(e)
        return rejectWithValue(e)
    }
})


export const updateSettings = createAsyncThunk("settings/update", async ({ settings, serverId }, {rejectWithValue }) => {
	try {
		await updateServerSettings(settings, serverId)
	} catch(e) {
		return rejectWithValue(e)
	}
})

const INITIAL_STATE = {
    id: null, // Identity of the server/room
    players: null, // Holds "player object"s | See what people that have joined
    settings: null, // Hold the "settings object" | Settings for the current room
    state: null, // State of the room, "lobby" | "ongoing?"
}

export const serverSlice = createSlice({
	name: "server",
	initialState: {...INITIAL_STATE},
	reducers: {
		setId: (state, action) => {},
		setRole: (state, action) => {},
		setPlayers: (state, action) => {
			state.players = action.payload
		},
        setState: (state, action) => {
            state.state = action.payload
        },
		setSettings: (state, action) => {
			state.settings = action.payload
		},
        resetServer: () => {
            return {...INITIAL_STATE}
        }
	},
	extraReducers: builder => {
		builder
            /* HostGame */
			.addCase(hostNewGame.pending, (state, action) => {
				console.log("Trying to host")
			})
			.addCase(hostNewGame.fulfilled, (state, { payload }) => {
				const { serverId } = payload
				state.id = serverId
				/* addServerWatchers() */
			})
			.addCase(hostNewGame.rejected, (state, action) => {
				alert(action.payload)
			})
            
			
			
			/* Join game */
			.addCase(joinGame.pending, (state, action) => {
				console.log("Trying to join")
			})
			.addCase(joinGame.fulfilled, (state, action) => {
				console.log(action.payload)
				const { serverId } = action.payload
				state.id = serverId
				/* addServerWatchers() */
			})
			.addCase(joinGame.rejected, (state, action) => {
				console.log("Rejected")
				alert(action.payload)
			})
            
			
			
			/* Kick player */
			.addCase(kickPlayer.pending, (state, action) => {
				console.log("Trying to kick player")
			})
			.addCase(kickPlayer.fulfilled, (state, action) => {
				console.log("fulfilled")
			})
			.addCase(kickPlayer.rejected, (state, action) => {
				console.log("Rejected")
				alert(action.payload)
			})


			
			/* Update Settings */
			.addCase(updateSettings.pending, (state, action) => {
				console.log("Trying to update settings")
			})
			.addCase(updateSettings.fulfilled, (state, action) => {
				console.log("Updated settings")
			})
			.addCase(updateSettings.rejected, (state, action) => {
				console.log("Rejected updating settings")
			})
	},
})

// Action creators are generated for each case reducer function
export const { setPlayers, setState, resetServer } = serverSlice.actions

export default serverSlice.reducer
