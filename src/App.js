import "./styles/App.css"
import main from "./styles/main.module.css"
import "react-toastify/dist/ReactToastify.css"

import CustomRouter, { history } from "./components/routing"


import { ToastContainer } from "react-toastify"

function App() {

	return (
		<CustomRouter history={history}>
			<h1 className={main.heading}>Trivia Feud</h1>
			<ToastContainer autoClose={2000} />
		</CustomRouter>
	)
}

export default App
