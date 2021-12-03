import LobbyPresenter from "./lobbyPresenter"
import QuickJoinPresenter from "./quickJoinPresenter"
import QuestionDraftPresenter from "./questionDraftPresenter"

import WaitingView from "../views/waitingView"

import { SERVER_STATES } from "../util/serverUtil"
import { GAME_STATES } from "../util/gameUtil"

import { useSelector } from "react-redux"

import store from "../redux/store.js"
import { full, big, small } from "../styles/main.module.css"
import QuestionPresenter from "./questionPresenter"

export default function GamePresenter() {
	const serverState = useSelector(state => state.server.state)
	const gameState = useSelector(state => state.game.gameState)

	/* lite fulhack */
	let state
	// console.log(gameState)
	if (serverState === SERVER_STATES.lobby) state = serverState
	else state = gameState

	switch (state) {
		case SERVER_STATES.lobby:
			return <LobbyPresenter />
		case GAME_STATES.questionDraft:
			return <QuestionDraftPresenter />
		case GAME_STATES.waiting:
			return <WaitingView />
		case GAME_STATES.question:
			return <QuestionPresenter />
		default:
			return <QuickJoinPresenter />
	}
}

const containers = {}
containers[GAME_STATES.waiting] = small
containers[GAME_STATES.questionDraft] = big
containers[GAME_STATES.question] = big
containers[GAME_STATES.questionWaiting] = small
containers[GAME_STATES.questionResult] = big
containers[GAME_STATES.gameResult] = full

export function getContainerSize() {
	const state = store.getState()
	if (state.server.state === SERVER_STATES.lobby) return full
	else if (state.server.state === SERVER_STATES.ongoing) {
		return containers[state.game.gameState] || small
	}
	return full
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
            answers: [
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
