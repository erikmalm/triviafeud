import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// api
import { getQuestions } from "../../api/questionSource"
import { API_STATES } from "../../api"

import { GAME_STATES, updateGameState } from "../../util/gameUtil"

// util
import { formatQuestion, saveQuestionToFirebase } from "../../util/questionUtil"

export const getCandidateQuestions = createAsyncThunk("questionDraft/get", async (_, { rejectWithValue }) => {
	try {
		const questions = await getQuestions({ amount: 4 })
		const formattedQuestions = questions.map(formatQuestion)
		return formattedQuestions
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const questionIsSelected = createAsyncThunk(
	"questionDraft/get",
	async ({ serverId, question }, { rejectWithValue }) => {
		try {
			// save question to firebase
			await saveQuestionToFirebase(serverId, question)
			await updateGameState(serverId, GAME_STATES.question)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const questionDraftSlice = createSlice({
	name: "questionDraft",
	initialState: {
		status: null,
		questions: [],
	},
	reducers: {
		setDraftQuestions: (state, { payload }) => {
			if (payload === null) {
				state.questions = {}
				return
			}
			state.questions = payload
		},
	},

	// Defines what async thunks should do at different states
	extraReducers: builder => {
		builder
			.addCase(getCandidateQuestions.pending, state => {
				state.status = API_STATES.PENDING
			})
			.addCase(getCandidateQuestions.fulfilled, (state, { payload }) => {
				state.questions = payload
				state.status = API_STATES.SUCCESS
			})
			.addCase(getCandidateQuestions.rejected, (state, action) => {
				alert(action.payload)
				state.status = API_STATES.ERROR
			})
	},
})

export const { setDraftQuestions } = questionDraftSlice.actions

export default questionDraftSlice.reducer
