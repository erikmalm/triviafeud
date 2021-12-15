import InfoView from "../views/infoView"

import { useSelector } from "react-redux"
import { useState } from "react"

import { GAME_STATES } from "../util/gameUtil"

import { leaveServer } from "../util/util"

const SHOW_CURRENT_ROUND = {}

SHOW_CURRENT_ROUND[GAME_STATES.questionWaiting] = true
SHOW_CURRENT_ROUND[GAME_STATES.roundResults] = true
SHOW_CURRENT_ROUND[GAME_STATES.questionDraft] = true

const PLAYER_CAN_LEAVE = {}

PLAYER_CAN_LEAVE[GAME_STATES.questionWaiting] = true
PLAYER_CAN_LEAVE[GAME_STATES.question] = true
PLAYER_CAN_LEAVE[GAME_STATES.roundResults] = true

const SHOW_PEOPLE = {}

SHOW_PEOPLE[GAME_STATES.waiting] = true
SHOW_PEOPLE[GAME_STATES.questionDraft] = true
SHOW_PEOPLE[GAME_STATES.questionWaiting] = true
SHOW_PEOPLE[GAME_STATES.question] = true

export default function InfoPresenter() {
	const { gameState, currentRound } = useSelector(state => state.game)
	const numberOfRounds = useSelector(state => state.settings.numberOfRounds)
	const players = useSelector(state => state.server.players)

	const [showPeople, setShowPoeple] = useState(false)

	const currentRoundObj = {
		show: SHOW_CURRENT_ROUND[gameState] === true,
		round: currentRound,
		max: numberOfRounds,
	}

	const leaveObj = {
		show: PLAYER_CAN_LEAVE[gameState] === true,
		do: leaveServer,
	}

	const peopleObj = {
		showButton: SHOW_PEOPLE[gameState] === true,
		showWindow: showPeople,
		toggle: setShowPoeple,
	}

	return <InfoView currentRound={currentRoundObj} leave={leaveObj} people={peopleObj} players={players} />
}
