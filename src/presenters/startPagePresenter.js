import StartPageView, { START_OPTIONS } from "../views/startPageView"
import TutorialView from "../views/tutorialView"

import { useDispatch, useSelector } from "react-redux"

import { notifyError } from "../components/notification"

import gamerNamer from "gamer-namer"
import { useState } from "react"
import { hostNewGame, joinGame } from "../redux/reducers/serverSlice"
import { history } from "../components/routing"

import { watchServerState } from "../redux/dbwatchers/serverWatcher"
import PublicRoomsPresenter from "./publicRoomsPresenter"

import { containsBadWords } from "../util/util"
import { watchPlayerStates } from "../redux/dbwatchers/playerWatcher"

export default function StartPagePresenter() {
	const dispatch = useDispatch()
    const status = useSelector(state => state.server.status)

	const [userName, setUserName] = useState(gamerNamer.generateName())
	const [serverId, setServerId] = useState("")
	const [publicRoom, setPublicRoom] = useState(false)
	const [showTutorial, setShowTutorial] = useState(false)

	const [startOption, setStartOption] = useState(START_OPTIONS.host)

	async function handleJoinServer(e) {
		e.preventDefault()

		if (containsBadWords(userName)) {
			return notifyError("Cannot join, your name contains bad words")
		}

		const { payload, error } = await dispatch(joinGame({ userName, serverId }))
		if (error) return
		watchServerState()
		watchPlayerStates(payload.playerId)
		history.push(`room/${payload.serverId}`)
	}

	async function handleHostServer(e) {
		e.preventDefault()
		if (containsBadWords(userName)) return notifyError("Cannot host, your name contains bad words")
		const { payload, error } = await dispatch(hostNewGame({ userName, publicRoom: publicRoom ? "on" : "off" }))
		if (error) return
		watchServerState()
		watchPlayerStates(payload.playerId)
		history.push(`room/${payload.serverId}`)
	}

	return showTutorial ? (
		<TutorialView close={() => setShowTutorial(false)} />
	) : (
		<StartPageView
			generateRandomName={() => setUserName(gamerNamer.generateName())}
			userName={userName}
			setUserName={name => setUserName(name)}
			setServerId={id => setServerId(id)}
			serverId={serverId}
			joinServer={handleJoinServer}
			hostServer={handleHostServer}
			startOption={startOption}
			setStartOption={setStartOption}
			publicRoom={publicRoom}
			setPublicRoom={setPublicRoom}
			showTutorial={() => setShowTutorial(true)}
            status={status}
		>
			<PublicRoomsPresenter />
		</StartPageView>
	)
}
