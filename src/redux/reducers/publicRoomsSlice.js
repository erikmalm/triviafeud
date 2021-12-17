import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
	rooms: [],
}

export const publicRoomsSlice = createSlice({
	name: "publicRooms",
	initialState: INITIAL_STATE,
	reducers: {
		addRoom: (state, { payload }) => {
			state.rooms.push(payload)
		},
		removeRoom: (state, { payload }) => {
			state.rooms = state.rooms.filter(room => room.serverId !== payload)
		},
		resetPublicRooms: () => ({ ...INITIAL_STATE }),
	},
})

export const { addRoom, removeRoom, resetPublicRooms } = publicRoomsSlice.actions

export default publicRoomsSlice.reducer
