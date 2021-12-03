import reducers from "./reducers/"
import { configureStore } from "@reduxjs/toolkit"

// We add middleware to the store via configureStore fix async / sync call
const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export default store
