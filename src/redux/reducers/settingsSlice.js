import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { settings, updateServerSetting, resetServerSettings } from "../../util/settingsUtil"



export const INITIAL_STATE = Object.keys(settings).reduce(function (result, key) {
    result[key] = settings[key].default
    return result
}, {})

export const updateSetting = createAsyncThunk("settings/update", async ({ setting, value, serverId }, {rejectWithValue }) => {
	try {
		await updateServerSetting(setting, value, serverId)
	} catch(e) {
		return rejectWithValue(e)
	}
})

export const resetSettings = createAsyncThunk("settings/reset", async ({ settings, serverId }, { rejectWithValue }) => {
    try {
        await resetServerSettings(settings, serverId)
    } catch (e) {
        return rejectWithValue(e)
    }
})




export const settingsSlice = createSlice({
    name: "settings",
    initialState: {...INITIAL_STATE},
    reducers: {
        setSetting: (state, { payload }) => {
            state[payload.setting] = payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(updateSetting.pending, (state, action) => {
                console.log("Trying to set settings")
            })
            .addCase(updateSetting.fulfilled, (state, { payload }) => {
                console.log("Setting has been NICE COCK")
            })
            .addCase(updateSetting.rejected, (state, action) => {
                alert(action.payload)
            })


            .addCase(resetSettings.pending, (state, action) => {
                console.log("Trying to reset settings")
            })
            .addCase(resetSettings.fulfilled, (state, action) => {
                console.log("Resetted settings")
            })
            .addCase(resetSettings.rejected, (state, action) => {
                alert(action.payload)
            })
    }
})


export const { setSetting } = settingsSlice.actions

export default settingsSlice.reducer
