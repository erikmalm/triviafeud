import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setGameState } from "./gameSlice"

// api
import { getQuestions } from "../../api/questionSource"
import { API_STATES } from "../../api"

import { notifyError } from "../../components/notification"

import { GAME_STATES, updateGameState } from "../../util/gameUtil"

import { db } from "../../api/fireSource"

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
	"questionDraft/select",
	async (question, { dispatch, getState, rejectWithValue }) => {
		dispatch(setGameState(GAME_STATES.waiting))
		const { server } = getState()
		try {
			await saveQuestionToFirebase(server.id, question)
			await updateGameState(server.id, GAME_STATES.question)

            await db.ref(`rooms/${server.id}/game/currentDrafter`).set(null)
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
				notifyError("Could not get questions: ", action.payload)
				state.status = API_STATES.ERROR
			})
            .addCase(questionIsSelected.pending, state => {state.status = null})
	},
})

export default questionDraftSlice.reducer
