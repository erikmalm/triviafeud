import { useDispatch, useSelector } from "react-redux"

import { useState } from "react"

import { parent } from "../styles/lobby.module.css"

import { kickPlayer } from "../redux/reducers/serverSlice"
import { startGame, startQuestionDrafting } from "../redux/reducers/gameSlice"

import LobbySettingsPresenter from "./lobbySettingsPresenter"
import LobbyActionsPresenter from "./lobbyActionsPresenter"
import LobbyOverviewPresenter from "./lobbyOverviewPresenter"

import { removeServerWatchers } from "../redux/dbwatchers/serverWatcher"

import { removeGameWatchers } from "../redux/dbwatchers/gameWatcher"

import { notifyError } from "../components/notification"

import { resetAndLeave } from "../util/util"

export default function LobbyPresenter() {
	const dispatch = useDispatch()

	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)

	const [showSettings, setShowSettings] = useState(false)

	async function handleLeaveLobby() {
		removeServerWatchers()
		if(playerState.isReady) removeGameWatchers()

		await dispatch(kickPlayer(playerState.playerId))
		
		resetAndLeave()
	}

	async function handleStartGame() {
		if (!serverState.players.every(participant => participant.ready)) return notifyError("Not all players are ready")

		// Start game
		await dispatch(startGame())

		await dispatch(startQuestionDrafting())
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
				leave={handleLeaveLobby}
				serverState={serverState}
				playerState={playerState}
			/>
		</div>
	)
}
