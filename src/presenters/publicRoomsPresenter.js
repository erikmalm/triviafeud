import { useEffect } from "react"

import { useSelector } from "react-redux"

import { addPublicRoomsWatcher, removePublicRoomsWatcher } from "../redux/dbwatchers/serverWatcher"
import PublicRooms from "../components/publicRooms"

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

	return <PublicRooms publicRooms={publicRooms} handleRoomClick={quickJoinRoom} />
}

/*

function publicRoomsWatcher(snapshot) {
	const vals = snapshot.val()
	if (vals === null) return

	const publicRooms = decodePublicRooms(vals)
	console.log(publicRooms)

    // store.dispatch(setRooms(publicRooms))
}

export function addPublicRoomsWatcher() {
	db.ref(`/`).on("child_added", publicRoomsWatcher)
	db.ref(`/`).on("child_removed", publicRoomsWatcher)
}

export function removePublicRoomsWatcher() {
	db.ref(`/`).off("child_added", publicRoomsWatcher)
	db.ref(`/`).off("child_removed", publicRoomsWatcher)
}

*/
