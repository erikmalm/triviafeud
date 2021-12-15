import { useDispatch, useSelector } from "react-redux"

import { useState } from "react"

import { parent } from "../styles/lobby.module.css"

import { kickPlayer } from "../redux/reducers/serverSlice"
import { startGame, startQuestionDrafting, startLoadingQuestions } from "../redux/reducers/gameSlice"

import LobbySettingsPresenter from "./lobbySettingsPresenter"
import LobbyActionsPresenter from "./lobbyActionsPresenter"
import LobbyOverviewPresenter from "./lobbyOverviewPresenter"

import { notifyError } from "../components/notification"

import { leaveServer } from "../util/util"

export default function LobbyPresenter() {
	const dispatch = useDispatch()

	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)
	const settingsState = useSelector(state => state.settings)

	const [showSettings, setShowSettings] = useState(false)

	async function handleStartGame() {
		if (!serverState.players.every(participant => participant.ready))
			return notifyError("Not all players are ready")

		// Start game
		await dispatch(startGame())

		if (settingsState.questionDrafting === "on") await dispatch(startQuestionDrafting())
		else await dispatch(startLoadingQuestions())
	}

	return (
		<div className={parent}>
			<LobbyOverviewPresenter
				kick={id => dispatch(kickPlayer(id))}
				serverState={serverState}
				playerState={playerState}
				showSettings={() => setShowSettings(true)}
			/>
			<LobbySettingsPresenter setShowSettings={() => setShowSettings(false)} showSettings={showSettings} />
			<LobbyActionsPresenter
				start={handleStartGame}
				leave={() => leaveServer()}
				serverState={serverState}
				playerState={playerState}
			/>
		</div>
	)
}
