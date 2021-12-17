import FinalResultsView from "../views/finalResultsView"

import { useSelector } from "react-redux"

import { useState, useEffect } from "react"

import { leaveServer } from "../util/util"

export default function FinalResultsPresenter() {
	const livePlayersState = useSelector(state => state.server.players)

	const [playersState, setPlayersState] = useState([])

	useEffect(() => {
		setPlayersState([...livePlayersState])
	}, [])

	let place = 0
	const playersWithScore = [...playersState]
		.sort((a, b) => b.score - a.score)
		.map(({ playerName, score, correctAnswers }, index, arr) => ({
			playerName,
			score,
			correctAnswers,
			place: score === (arr[index - 1] == null ? -1 : arr[index - 1].score) ? place : ++place,
		}))

	return <FinalResultsView players={playersWithScore} exit={() => leaveServer()} />
}
