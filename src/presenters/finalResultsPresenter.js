import FinalResultsView from "../views/finalResultsView"

import { useSelector, useDispatch } from "react-redux"

import { removeServerWatchers } from "../redux/dbwatchers/serverWatcher"
import { removeGameWatchers } from "../redux/dbwatchers/gameWatcher"

import { kickPlayer } from "../redux/reducers/serverSlice"

import { resetAndLeave } from "../util/util"

export default function FinalResultsPresenter() {
	const playersState = useSelector(state => state.server.players)
	const playerState = useSelector(state => state.player)
	const dispatch = useDispatch()

	async function handleExit() {
		removeServerWatchers()
		removeGameWatchers()

		await dispatch(kickPlayer(playerState.playerId))

		resetAndLeave()
	}

	let place = 0
	const playersWithScore = [...playersState]
		.sort((a, b) => b.score - a.score)
		.map(({ playerName, score }, index, arr) => ({
			playerName,
			score,
			place: score === (arr[index - 1] == null ? -1 : arr[index - 1].score) ? place : ++place,
		}))

	return <FinalResultsView players={playersWithScore} exit={handleExit} />
}
