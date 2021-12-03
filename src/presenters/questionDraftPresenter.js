import { QuestionDraftView, QuestionDraftViewDrafter } from "../views/questionDraftView"

import { useDispatch, useSelector } from "react-redux"
import { getQuestions } from "../api/questionSource"
import { promiseNoData } from "../api/util"

import { API_STATES } from "../api"

import { useState } from "react"
import { SpinnerIcon } from "../icons"

import { GAME_STATES } from "../util/gameUtil"
import { setGameState } from "../redux/reducers/gameSlice"

import { questionIsSelected } from "../redux/reducers/questionDraftSlice"

export default function QuestionDraftPresenter() {
	const dispatch = useDispatch()

	// Our pretty states
	const gameState = useSelector(state => state.game)
	const playerState = useSelector(state => state.player)
	const serverState = useSelector(state => state.server)
	const questionDraftState = useSelector(state => state.questionDraft)

	function handleSelectQuestion(index) {
		dispatch(setGameState(GAME_STATES.waiting))
		dispatch(questionIsSelected({ serverId: serverState.id, question: questionDraftState.questions[index] }))
	}

	if (playerState.playerId === gameState.currentDrafter) {
		if (questionDraftState.status === API_STATES.SUCCESS) {
			return (
				<QuestionDraftViewDrafter
					questions={questionDraftState.questions.map(question => question.question)}
					selectQuestion={handleSelectQuestion}
				/>
			)
		}
		return (
			<div>
				<SpinnerIcon width="50" color="#fff" />
			</div>
		)
	}

	// Find the right player name through current drafter ID
	const { playerName: drafter } = serverState.players.find(({ playerId }) => playerId === gameState.currentDrafter)

	return <QuestionDraftView drafter={drafter} />
}
