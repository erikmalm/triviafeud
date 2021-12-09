import main from '../styles/main.module.css'

// Presenters
import StartPagePresenter from "../presenters/startPagePresenter"
import GamePresenter, { getContainerSize, getOpacity } from "../presenters/gamePresenter"


import { useEffect, useLayoutEffect, useState, useRef } from "react"

import { Router, Route, Routes } from "react-router-dom"

import { matchPath } from "react-router"

import { createBrowserHistory } from 'history'

import { useSelector } from 'react-redux'


export const history = createBrowserHistory();


const allRoutes = [
	{
		path: "/room/:id",
		element: GamePresenter,
		container: getContainerSize,
		opacity: getOpacity
	},
	{
		path: "/",
		element: StartPagePresenter,
		container: () => main.big,
		opacity: () => main.low
	},
]

export default function CustomRouter ({ history, children, ...props }) {
	const [currentRoute, setCurrentRoute] = useState(null)
	const [shouldRender, setShouldRender] = useState(false)
	const [containerSize, setContainerSize] = useState("")
	const [containerOpacity, setContainerOpacity] = useState("")
	const containerRef = useRef(null)

	const gameState = useSelector(state => state.game.gameState)

	const [state, setState] = useState({
		action: history.action,
		location: history.location
	});

	useEffect(() => {
		const route = allRoutes.find(({ path }) => matchPath(path, history.location.pathname) !== null)
		setCurrentRoute(route)
		setContainerSize(route.container())
		setContainerOpacity(route.opacity())
		if (!containerRef.current) return setShouldRender(true)

		setShouldRender(false)
		containerRef.current.addEventListener("transitionend", () => setShouldRender(true), { once: true })
	}, [history.location])

	useEffect(() => {
		if (!currentRoute) return
		setContainerSize(currentRoute.container())
		setContainerOpacity(currentRoute.opacity())
	}, [gameState, currentRoute, setContainerSize])

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			{...props}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		>
			{children}
			{currentRoute && (
				<div ref={containerRef} className={`${main.container} ${containerSize} ${containerOpacity}`}>
					{shouldRender && (
						<Routes>
							<Route path='/' element={<StartPagePresenter />} />
							<Route path='/room/:id' element={<GamePresenter />} />
						</Routes>
					)}
				</div>
			)}
		</Router>
	);
};