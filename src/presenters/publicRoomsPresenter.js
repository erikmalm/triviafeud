import { useEffect } from "react"

import { useSelector } from "react-redux"

import { addPublicRoomsWatcher, removePublicRoomsWatcher } from "../redux/dbwatchers/serverWatcher"
import PublicRoomsView from "../views/publicRoomsView"

import { history } from "../components/routing"

export default function PublicRoomsPresenter() {
	const publicRooms = useSelector(state => state.publicRooms)

	useEffect(() => {
		addPublicRoomsWatcher()
		return () => removePublicRoomsWatcher()
	}, [])

	function quickJoinRoom(serverId) {
		history.push("/room/" + serverId)
	}

	return <PublicRoomsView publicRooms={publicRooms} handleRoomClick={quickJoinRoom} />
}
