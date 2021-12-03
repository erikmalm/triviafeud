import { db } from "../api/fireSource"

export async function saveReadyToFireBase(readyState, serverId, playerId) {
	await db.ref(`rooms/${serverId}/players/${playerId}/ready`).set(readyState)
}

export async function saveEmojiToFireBase({emojiState, serverId, playerId}) {
	await db.ref(`rooms/${serverId}/players/${playerId}/emoji`).set(emojiState)
}
