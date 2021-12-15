import main from "../styles/main.module.css"

import StartPagePresenter from "../presenters/startPagePresenter"
import GamePresenter, { getContainerSize, getOpacity } from "../presenters/gamePresenter"

import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react"

import { Router, Route, Routes } from "react-router-dom"

import { matchPath } from "react-router"

import { createBrowserHistory } from "history"

import { useSelector } from "react-redux"

export const history = createBrowserHistory()

const allRoutes = [
	{
		path: "/room/:id",
		element: GamePresenter,
		container: getContainerSize,
		opacity: getOpacity,
		preventDeload: true,
	},
	{
		path: "/",
		element: StartPagePresenter,
		container: () => main.big,
		opacity: () => main.low,
		preventDeload: false,
	},
]

function onUnLoad(e) {
	e.preventDefault()
	const msg = "Do not leave the page while a game is running, use the exit button first"
	e.returnValue = msg
	return msg
}

export default function CustomRouter({ history, children, ...props }) {
	const [currentRoute, setCurrentRoute] = useState(null)
	const [shouldRender, setShouldRender] = useState(false)
	const [containerSize, setContainerSize] = useState("")
	const [containerOpacity, setContainerOpacity] = useState("")
	const containerRef = useRef(null)

	const gameState = useSelector(state => state.game.gameState)

	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	})

	const evaluateStateChange = useCallback(
		newRoute => {
			if (containerSize === newRoute.container() && containerOpacity === newRoute.opacity()) return
			if (!containerRef.current) return setShouldRender(true)

			window.requestAnimationFrame(() => {
				setContainerSize(newRoute.container())
				setContainerOpacity(newRoute.opacity())

				setShouldRender(false)
				containerRef.current.addEventListener("transitionend", () => setShouldRender(true), { once: true })
			})
		},
		[containerSize, containerOpacity, containerRef]
	)

	useEffect(() => {
		const route = allRoutes.find(({ path }) => matchPath(path, history.location.pathname) !== null)

		evaluateStateChange(route)

		setCurrentRoute(route)
		if (route.preventDeload) window.addEventListener("beforeunload", onUnLoad)
		else window.removeEventListener("beforeunload", onUnLoad)
	}, [history.location, evaluateStateChange])

	useEffect(() => {
		if (!currentRoute) return
		evaluateStateChange(currentRoute)
	}, [gameState, currentRoute, evaluateStateChange])

	useLayoutEffect(() => history.listen(setState), [history])

	return (
		<Router {...props} location={state.location} navigationType={state.action} navigator={history}>
			{children}
			{currentRoute && (
				<div ref={containerRef} className={`${main.container} ${containerSize} ${containerOpacity}`}>
					{shouldRender && (
						<Routes>
							<Route path="/" element={<StartPagePresenter />} />
							<Route path="/room/:id" element={<GamePresenter />} />
						</Routes>
					)}
				</div>
			)}
		</Router>
	)
}
