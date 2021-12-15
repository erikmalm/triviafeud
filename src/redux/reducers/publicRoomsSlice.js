import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
	rooms: null,
}

export const publicRoomsSlice = createSlice({
	name: "publicRooms",
	initialState: INITIAL_STATE,
	reducers: {
		setRooms: (state, { payload }) => {
			state.rooms = payload
		},
	},
})

export const { setRooms } = publicRoomsSlice.actions

export default publicRoomsSlice.reducer
