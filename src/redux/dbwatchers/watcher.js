import { db } from "../../api/fireSource"

import store from "../store"

let currentWatchers = []

export function watch(ref, type, cb) {
	if (currentWatchers.some(watcher => watcher.ref === ref && watcher.type === type))
		throw new Error("Reference is already being watched with same type")

	const serverId = store.getState().server.id

	console.log(`${serverId}/${ref}`)

	db.ref(`rooms/${serverId}/${ref}`).on(type, cb)
	currentWatchers.push({
		ref,
		type,
		cb,
	})
}

export function ignore(ref, type) {
	const watcher = currentWatchers.find(watcher => watcher.ref === ref && watcher.type === type)
	if (!watcher) throw new Error("Watcher does not exist")

	const serverId = store.getState().server.id

	db.ref(`rooms/${serverId}/${watcher.ref}`).off(watcher.type, watcher.cb)

	currentWatchers.splice(currentWatchers.indexOf(watcher), 1)

	// Försökte debugga och lägga i try catch men vet inte om det blev bättre,
	// ursprunglig if-sats nedanför:
	//
}
