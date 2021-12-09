// React specific import
import React from "react"
import ReactDOM from "react-dom"

// Application
import App from "./App"

// Provider for react-redux
import { Provider } from "react-redux"

// Our Redux store
import store from "./redux/store"

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
