import StartPageView, { START_OPTIONS } from "../views/startPageView"

import { useDispatch } from "react-redux"

import gamerNamer from "gamer-namer"
import { useState } from "react"
import { hostNewGame, joinGame } from "../redux/reducers/serverSlice"
import { setPlayer } from "../redux/reducers/playerSlice"
import { history } from '../components/routing'

import { addServerWatchers } from "../redux/dbwatchers/serverWatcher"

export default function StartPagePresenter() {
	const dispatch = useDispatch()

	const [userName, setUserName] = useState(gamerNamer.generateName())
	const [serverId, setServerId] = useState("")

    const [startOption, setStartOption] = useState(START_OPTIONS.host)

	async function handleJoinServer(e) {
		e.preventDefault()
		const { payload, error } = await dispatch(joinGame({ userName, serverId }))
		if (error) return
		dispatch(setPlayer(payload.playerObj))
        addServerWatchers()
		history.push(`room/${payload.serverId}`)
	}

	async function handleHostServer(e) {
		e.preventDefault()
		const { payload, error } = await dispatch(hostNewGame(userName))
		if (error) return
		dispatch(setPlayer(payload.playerObj))
        addServerWatchers()
		history.push(`room/${payload.serverId}`)
	}

	return (
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
		/>
	)
}
