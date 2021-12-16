// CSS
import { full, big, small, low, high } from "../styles/main.module.css"

// Redux, store & util
import store from "../redux/store.js"
import { SERVER_STATES } from "../util/serverUtil"
import { GAME_STATES } from "../util/gameUtil"
import { useSelector } from "react-redux"

// Presenters
import QuestionPresenter from "./questionPresenter"
import WaitingForPlayersPresenter from "./waitingForPlayersPresenter"
import LobbyPresenter from "./lobbyPresenter"
import QuickJoinPresenter from "./quickJoinPresenter"
import QuestionDraftPresenter from "./questionDraftPresenter"
import RoundResultsPresenter from "./roundResultsPresenter"
import FinalResultsPresenter from "./finalResultsPresenter"

// Consider importing Presenter instead
import WaitingView from "../views/waitingView"

export default function GamePresenter() {
	const serverState = useSelector(state => state.server.state)
	const gameState = useSelector(state => state.game.gameState)

	/* lite fulhack */
	let state
	if (serverState === SERVER_STATES.lobby) state = serverState
	else state = gameState

	switch (state) {
		case SERVER_STATES.lobby:
			return <LobbyPresenter />
		case GAME_STATES.questionDraft:
			return <QuestionDraftPresenter />
		case GAME_STATES.waiting:
			return <WaitingView />
		case GAME_STATES.waitingForPlayers:
			return <WaitingForPlayersPresenter />
		case GAME_STATES.roundResults:
			return <RoundResultsPresenter />
		case GAME_STATES.question:
			return <QuestionPresenter />
		case GAME_STATES.gameResult:
			return <FinalResultsPresenter />
		default:
			return <QuickJoinPresenter />
	}
}

const containers = {}
containers[GAME_STATES.waiting] = small
containers[GAME_STATES.questionDraft] = big
containers[GAME_STATES.question] = big
containers[GAME_STATES.questionWaiting] = small
containers[GAME_STATES.roundResults] = big
containers[GAME_STATES.gameResult] = full

const opacities = {}
opacities[GAME_STATES.question] = high

export function getContainerSize() {
	const state = store.getState()
	if (state.game.gameState === GAME_STATES.questionDraft && state.game.currentDrafter !== state.player.playerId)
		return small
	if (state.server.state === SERVER_STATES.lobby || state.server.state == null) return full

	return containers[state.game.gameState] || small
}

export function getOpacity() {
	const state = store.getState()
	return opacities[state.game.gameState] || low
}

/*

room ->

{
    host: ""
    state: ""
    game: {
		state: 
        currentRound: N
        currentQuestion: {
            question: question obj
            playerAnswers: [
                {
                    playerId: ""
                    correct: bool,
                    addedScore: N <- yes!
					
					maybe add:
					-> answeredRandomly? <-

                }
            ]
        }
        questionDraft: {
            currentDrafter: {playerId}
        }
    }
    players: [
        {
            playerId:
			playerName:
			ready: (irrelevant after game start)
			role: (not at all irrelevant after game start)
			score: N
            questionsDrafted: N

        }
    ]
    settings: {
		    numberOfRounds: N
        
    }
}

*/
