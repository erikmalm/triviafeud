import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { useEffect, useState } from "react"

import { resetPlayer } from "../redux/reducers/playerSlice"
import { kickPlayer, resetServer } from "../redux/reducers/serverSlice"
import { startGame, startQuestionDrafting } from "../redux/reducers/gameSlice"

import LobbySettingsPresenter from "./lobbySettingsPresenter"
import LobbyActionsPresenter from "./lobbyActionsPresenter"
import LobbyOverviewPresenter from "./lobbyOverviewPresenter"

import { removeServerWatchers } from "../redux/dbwatchers/serverWatcher"

import styles from "../styles/lobby.module.css"
import { removeGameWatchers } from "../redux/dbwatchers/gameWatcher"

import { notifyWarning } from "../components/notification"

export default function LobbyPresenter() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const serverState = useSelector(state => state.server)
	const playerState = useSelector(state => state.player)

	const [showSettings, setShowSettings] = useState(false)

	const kickedState = useSelector(state => state.player.kicked)

	useEffect(() => {
		if (kickedState) {
			notifyWarning("You have been kicked")
			removeServerWatchers()
			exitToStartPage()
		}
	}, [kickedState])

	function handleLeaveLobby() {
		removeServerWatchers()
		dispatch(kickPlayer({ playerId: playerState.playerId, serverId: serverState.id }))

		exitToStartPage()
	}

	function handleKick(id) {
		dispatch(kickPlayer({ playerId: id, serverId: serverState.id }))
	}

	function exitToStartPage() {
        if(playerState.isReady) removeGameWatchers()
		dispatch(resetServer())
		dispatch(resetPlayer())
		navigate("/")
	}

	function triggerSettings() {
		setShowSettings(!showSettings)
	}

	async function handleStartGame() {
		if (!serverState.players.every(participant => participant.ready)) return alert("Not all players are ready")

		// Start game
		await dispatch(startGame(serverState.id))

		// Draft question
		await dispatch(
			startQuestionDrafting({
				serverId: serverState.id,
				players: serverState.players,
			})
		)
	}

	return (
		<div className={styles.parent}>
			<LobbyOverviewPresenter kick={handleKick} serverState={serverState} playerState={playerState} showSettings={triggerSettings}/>
			<LobbyActionsPresenter
				start={handleStartGame}
				leave={handleLeaveLobby}
				serverState={serverState}
				playerState={playerState}
			/>
			{showSettings && <LobbySettingsPresenter showSettings={triggerSettings}/>} 
		</div>
	)
}
