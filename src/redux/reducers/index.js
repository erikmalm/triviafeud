// Combine reducers
import { combineReducers } from "redux"
// Reducers
import serverReducer from "./serverSlice"
import playerReducer from "./playerSlice"
import gameReducer from "./gameSlice"
import questionDraftReducer from "./questionDraftSlice"
import settingsReducer from "./settingsSlice"
import publicRoomsReducer from "./publicRoomsSlice"

const reducers = combineReducers({
	questionDraft: questionDraftReducer,
	server: serverReducer,
	player: playerReducer,
	game: gameReducer,
	settings: settingsReducer,
	publicRooms: publicRoomsReducer,
})

export default reducers
