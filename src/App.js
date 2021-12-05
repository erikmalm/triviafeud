import "./styles/App.css"
import main from "./styles/main.module.css"
import "react-toastify/dist/ReactToastify.css"

import { useEffect, useState, useRef } from "react"

import { useLocation, matchPath } from "react-router"
import { Route, Routes } from "react-router-dom"

import { useSelector } from "react-redux"

// Presenters
import QuestionPresenter from "./presenters/questionPresenter"
import StartPagePresenter from "./presenters/startPagePresenter"
import GamePresenter, { getContainerSize } from "./presenters/gamePresenter"
import LobbySettingsPresenter from "./presenters/lobbySettingsPresenter"

import { ToastContainer, toast } from "react-toastify"

const allRoutes = [
	{
		path: "/question",
		element: QuestionPresenter,
		container: () => main.big,
	},
	{
		path: "/room/:id",
		element: GamePresenter,
		container: getContainerSize,
	},
	{
		path: "/settings",
		element: LobbySettingsPresenter,
		container: () => main.full,
	},
	{
		path: "/",
		element: StartPagePresenter,
		container: () => main.big,
	},
]

function App() {
	const location = useLocation()
	const [currentRoute, setCurrentRoute] = useState(null)
	const [shouldRender, setShouldRender] = useState(false)
	const [containerSize, setContainerSize] = useState("")
	const containerRef = useRef(null)

	const gameState = useSelector(state => state.game.gameState)

	useEffect(() => {
		const route = allRoutes.find(({ path }) => matchPath(path, location.pathname) !== null)
		setCurrentRoute(route)
		setContainerSize(route.container())
		if (!containerRef.current) return setShouldRender(true)

		setShouldRender(false)
		containerRef.current.addEventListener("transitionend", () => setShouldRender(true), { once: true })
	}, [location])

	useEffect(() => {
		if (!currentRoute) return
		setContainerSize(currentRoute.container())
	}, [gameState])

	return (
		<>
			<h1 className={main.heading}>Trivia Feud</h1>
			<ToastContainer autoClocse={2000} />
			{currentRoute && (
				<div ref={containerRef} className={`${main.container} ${currentRoute.container()}`}>
					{shouldRender && (
						<Routes>
							<Route path={currentRoute.path} element={<currentRoute.element />} />
						</Routes>
					)}
				</div>
			)}
		</>
	)
}

export default App
