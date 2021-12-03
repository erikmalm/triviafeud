import QuickJoinView from "../views/quickJoinView"

import { useDispatch } from "react-redux"

import gamerNamer from "gamer-namer"
import { useState } from "react"
import { joinGame } from "../redux/reducers/serverSlice"
import { setPlayer } from "../redux/reducers/playerSlice"
import { useParams } from "react-router-dom"

import { addServerWatchers } from "../redux/dbwatchers/serverWatcher"

export default function QuickJoinPresenter() {
	const dispatch = useDispatch()
	const { id } = useParams()

	const [userName, setUserName] = useState(gamerNamer.generateName())

	return (
		<QuickJoinView
			onSubmit={async e => {
				e.preventDefault()
				const { payload, error } = await dispatch(joinGame({ userName, serverId: id }))
				if (error) return
				dispatch(setPlayer(payload.playerObj))
				addServerWatchers()
			}}
			userName={userName}
			setUserName={setUserName}
		/>
	)
}
