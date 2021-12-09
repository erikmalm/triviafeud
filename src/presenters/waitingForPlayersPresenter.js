// Rect, redux and util & reducers
import { setGameState, setGlobalGameState } from "../redux/reducers/gameSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { GAME_STATES } from "../util/gameUtil"

// View
import WaitingForPlayersView from "../views/waitingForPlayersView"

// Default function
export default function WaitingForPlayersPresenter() {
	const dispatch = useDispatch()

	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)
	const playerAnswers = useSelector(state => state.game.playerAnswers)

	useEffect(() => {
		if (playerAnswers.length < serverState.players.length) return

		// Let players wait while game state reset
		dispatch(setGameState(GAME_STATES.waiting))

		// Not waiting for any more players, go to round result presenter
		if (playerState.role === 'host')
            dispatch(setGlobalGameState(GAME_STATES.roundResults))
	}, [playerAnswers, dispatch, playerState.role, serverState.players.length])

    const playersNoAnswer = serverState.players.filter(player => !playerAnswers.some(answer => answer.playerId === player.playerId))

	return (
		<div>
			<WaitingForPlayersView waitingForPlayers={playersNoAnswer} />
		</div>
	)
}
