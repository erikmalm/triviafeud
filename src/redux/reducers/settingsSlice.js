import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { notifyError } from "../../components/notification"
import { settings, updateServerSetting, resetServerSettings } from "../../util/settingsUtil"

export const INITIAL_STATE = settings.reduce((result, setting) => {
	result[setting.name] = setting.default
	return result
}, {})

export const updateSetting = createAsyncThunk(
	"settings/update",
	async ({ setting, value }, { rejectWithValue, getState }) => {
		const serverId = getState().server.id
		try {
			await updateServerSetting(setting, value, serverId)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const revertSettings = createAsyncThunk("settings/reset", async (_, { rejectWithValue, getState }) => {
	const serverId = getState().server.id
	try {
		await resetServerSettings(INITIAL_STATE, serverId)
	} catch (e) {
		return rejectWithValue(e)
	}
})

export const settingsSlice = createSlice({
	name: "settings",
	initialState: { ...INITIAL_STATE },
	reducers: {
		setSetting: (state, { payload }) => {
			state[payload.setting] = payload.value
		},
		resetSettings: () => {
			return { ...INITIAL_STATE }
		},
	},
	extraReducers: builder => {
		builder
			.addCase(updateSetting.rejected, (state, action) => {
				notifyError(action.payload)
			})
			.addCase(revertSettings.rejected, (state, action) => {
				notifyError(action.payload)
			})
	},
})

export const { setSetting, resetSettings } = settingsSlice.actions

export default settingsSlice.reducer
