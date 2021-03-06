import QuickJoinView from "../views/quickJoinView"

import { useDispatch, useSelector } from "react-redux"

import gamerNamer from "gamer-namer"
import { useState } from "react"
import { joinGame } from "../redux/reducers/serverSlice"
import { useParams } from "react-router-dom"

import { watchServerState } from "../redux/dbwatchers/serverWatcher"
import { watchPlayerStates } from "../redux/dbwatchers/playerWatcher"

export default function QuickJoinPresenter() {
	const dispatch = useDispatch()
    const status = useSelector(state => state.server.status)
	const { id } = useParams()

	const [userName, setUserName] = useState(gamerNamer.generateName())

	return (
		<QuickJoinView
			onSubmit={async e => {
				e.preventDefault()
				const { payload, error } = await dispatch(joinGame({ userName, serverId: id }))
				if (error) return
				watchServerState()
                watchPlayerStates(payload.playerId)
			}}
			userName={userName}
			setUserName={setUserName}
			generateRandomName={() => setUserName(gamerNamer.generateName())}
            status={status}
		/>
	)
}
