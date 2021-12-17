import "./styles/App.css"
import main from "./styles/main.module.css"
import "react-toastify/dist/ReactToastify.css"

import InfoPresenter from "./presenters/infoPresenter"

import IosTouchPadding from "./components/iosTouchPadding"

import CustomRouter, { history } from "./components/routing"

import { SERVER_STATES } from "./util/serverUtil"

import { ToastContainer } from "react-toastify"

import { useSelector } from "react-redux"

function App() {
	const serverState = useSelector(state => state.server.state)
	return (
		<IosTouchPadding>
			<CustomRouter history={history}>
				<h1 className={main.heading}>Trivia Feud</h1>
				{serverState === SERVER_STATES.ongoing && <InfoPresenter />}
				<ToastContainer autoClose={4000} />
			</CustomRouter>
		</IosTouchPadding>
	)
}

export default App
