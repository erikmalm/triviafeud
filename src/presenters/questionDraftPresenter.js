import { QuestionDraftView, QuestionDraftViewDrafter } from "../views/questionDraftView"

import { useDispatch, useSelector } from "react-redux"

import { API_STATES } from "../api"

import { SpinnerIcon } from "../icons"

import { questionIsSelected } from "../redux/reducers/questionDraftSlice"

export default function QuestionDraftPresenter() {
	const dispatch = useDispatch()

	const currentDrafter = useSelector(state => state.game.currentDrafter)
	const playerId = useSelector(state => state.player.playerId)
	const players = useSelector(state => state.server.players)
	const questionDraftState = useSelector(state => state.questionDraft)

	if (playerId === currentDrafter) {
		if (questionDraftState.status === API_STATES.SUCCESS) {
			return (
				<QuestionDraftViewDrafter
					questions={questionDraftState.questions.map(question => question.question)}
					selectQuestion={index => dispatch(questionIsSelected(questionDraftState.questions[index]))}
				/>
			)
		}
		return <SpinnerIcon width="50" color="#fff" />
	}

	const drafter = players.find(({ playerId }) => playerId === currentDrafter).playerName

	return <QuestionDraftView drafter={drafter} />
}
