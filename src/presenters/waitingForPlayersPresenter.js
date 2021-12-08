// Rect, redux and util & reducers
import { setGameState, setGlobalGameState } from "../redux/reducers/gameSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { GAME_STATES } from "../util/gameUtil"

// View
import WaitingForPlayersView from "../views/waitingForPlayersView"

// Default function
export default function WaitingForPlayersPresenter() {
	// States
	const gameState = useSelector(state => state.game)
	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)
	const playerAnswers = useSelector(state => state.game.playerAnswers)

	// Helper
	const dispatch = useDispatch()

	// For some reason I only manage to store this value in gameState -> playerAnswers
	// https://www.pluralsight.com/guides/deeply-nested-objectives-redux
	// To fix later...!

	useEffect(() => {
		if (playerAnswers.length < serverState.players.length) return

		// Let players wait while game state reset
		dispatch(setGameState(GAME_STATES.waiting))

		// Not waiting for any more players, go to round result presenter
		if (playerState.role === 'host')
            dispatch(setGlobalGameState({
                serverId: serverState.id,
                gameState: GAME_STATES.roundResults,
            }))

		
		// Clear question and answers in firebase
		/* if (playerState.role === "host") {
			dispatch(
				clearCurrentQuestion({
					serverId: serverState.id,
				})
			)

			// Reset local
			// dispatch(resetCurrentQuestion())
		} */

		// If ready for new question, draft
		// I would like to include some kind of check here,
		// to ensure that the game is ready
		// to start question drafting

		/* This function was originally used for our quetion drafting
        It does not work immediately so it requires some more work,
        maybe we need a specific function for generic question drafting
        to seperate drafting from first draft.

		const { payload: draftingPlayer } = dispatch(
			startQuestionDrafting({
				serverId: serverState.id,
				players: serverState.players,
			})
		)
        */
	}, [playerAnswers])

    const playersNoAnswer = serverState.players.filter(player => !playerAnswers.some(answer => answer.playerId === player.playerId))

	console.log(playersNoAnswer)


	return (
		<div>
			<WaitingForPlayersView waitingForPlayers={playersNoAnswer} />
		</div>
	)
}
