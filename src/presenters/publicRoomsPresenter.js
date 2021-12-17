import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import { addPublicRoomsWatcher, removePublicRoomsWatcher } from "../redux/dbwatchers/serverWatcher"
import PublicRoomsView from "../views/publicRoomsView"

import { resetPublicRooms } from "../redux/reducers/publicRoomsSlice"

import { history } from "../components/routing"

export default function PublicRoomsPresenter() {
	const dispatch = useDispatch()
	const publicRooms = useSelector(state => state.publicRooms)

	useEffect(() => {
		addPublicRoomsWatcher()
		return () => {
			removePublicRoomsWatcher()
			dispatch(resetPublicRooms())
		}
	}, [])

	function quickJoinRoom(serverId) {
		history.push("/room/" + serverId)
	}

	return <PublicRoomsView publicRooms={publicRooms} handleRoomClick={quickJoinRoom} />
}
