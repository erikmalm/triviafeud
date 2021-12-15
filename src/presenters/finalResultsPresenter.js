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

	const playersWithScore = playersState
		.map(({ playerName, playerId, score }) => ({
			playerName,
			score,
		}))
		.sort((a, b) => b.score - a.score)

	return <FinalResultsView players={playersWithScore} exit={handleExit} />
}
