import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { saveReadyToFireBase, saveEmojiToFireBase } from "../../util/playerUtil"

// API_URL
/* https://opentdb.com/api.php?amount=1 */

export const setReady = createAsyncThunk("player/setReady", async (readyState, { rejectWithValue, getState })  => {
    try {
        const { server, player } = getState()
        await saveReadyToFireBase(readyState, server.id, player.playerId)
        return readyState
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const setEmoji = createAsyncThunk("player/setEmoji", async (emoji, { rejectWithValue, getState })  => {
    try {
        const { server, player } = getState()
        await saveEmojiToFireBase({
            serverId: server.id, 
            playerId: player.playerId, 
            emojiState: emoji
        })
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
    ready: false, // Holds the boolean to if the player is ready to start the game,
    kicked: false, // If player is kicked true
}

export const playerSlice = createSlice({
	name: "player",
	initialState: {...INITIAL_STATE},
	reducers: {
		setPlayer: (state, { payload }) => {
            return {
                ...state,
                ...payload
            }
        },
        resetPlayer: () => {
            return {...INITIAL_STATE}
        },
        setKicked: (state, { payload }) => {
            state.kicked = payload
        }
	},
    extraReducers: builder => {
        builder
            .addCase(setReady.fulfilled, (state, { payload }) => {
				state.ready = payload
            })
            .addCase(setReady.rejected, (_, { payload }) => {
                alert(payload)
            })
            .addCase(setEmoji.rejected, (_, { payload }) => {
                alert(payload)
            })  
    }
})


// creators are generated for each case reducer function
export const { setPlayer, resetPlayer, setKicked } = playerSlice.actions

export default playerSlice.reducer
