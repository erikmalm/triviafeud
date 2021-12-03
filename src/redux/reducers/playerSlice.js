import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { saveReadyToFireBase, saveEmojiToFireBase } from "../../util/playerUtil"

// API_URL
/* https://opentdb.com/api.php?amount=1 */


/**
 * Changes a state (setReady) asynchronously
 */

export const setReady = createAsyncThunk("player/setReady", async ({readyState, serverId, playerId}, { rejectWithValue })  => {
    try {
        await saveReadyToFireBase(readyState, serverId, playerId)
        return readyState
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const setEmoji = createAsyncThunk("player/setEmoji", async (action, { rejectWithValue })  => {
    try {
        await saveEmojiToFireBase(action)
        return action
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
        resetPlayer: state => {
            return {...INITIAL_STATE}
        },
        setKicked: (state, { payload }) => {
            state.kicked = payload
        }
	},
    extraReducers: builder => {
        builder
            .addCase(setReady.pending, (state, action) => {
                // console.log("Trying to set ready")
            })
            .addCase(setReady.fulfilled, (state, { payload }) => {
				state.ready = payload
            })
            .addCase(setReady.rejected, (state, action) => {
                alert(action.payload)
            })  
            .addCase(setEmoji.pending, (state, action) => {
                // console.log("Trying to set emoji")
            })
            .addCase(setEmoji.fulfilled, (state, { payload }) => {
                // console.log("fullfilled")
            })
            .addCase(setEmoji.rejected, (state, action) => {
                alert(action.payload)
            })  
    }
})


// Action creators are generated for each case reducer function
export const { setPlayer, resetPlayer, setKicked } = playerSlice.actions

export default playerSlice.reducer
