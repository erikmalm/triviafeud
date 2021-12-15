import { db } from "../../api/fireSource"

import { setPlayers, setState, setHost } from "../reducers/serverSlice"
import { setPlayer } from "../reducers/playerSlice"

import { setSetting } from "../reducers/settingsSlice"

import { decodeFirebaseArray, leaveServer } from "../../util/util.js"

import { decodePublicRooms } from "../../util/serverUtil"

import store from "../store"

import { notifySuccess, notifyWarning, notifyInfo } from "../../components/notification"

import { setRooms } from "../reducers/publicRoomsSlice"

/**
 * Keeps track of the players in the game
 * game vals
 */
export function addServerWatchers() {
	addPlayersWatcher()
	addStateWatcher()
	addKickedWatcher()
	addSettingsCategoryWatcher()
	addSettingsModeWatcher()
	addSettingsQuestionDraftingWatcher()
	addSettingsRoundsWatcher()
	addSettingsSpeedWatcher()
	addOwnPlayerWatcher()
	addSettingsDifficultyWatcher()
	addSettingsPublicWatcher()
	addSettingsRoomNameWatcher()
	addHostChangeWatcher()
}

export function removeServerWatchers() {
	removePlayersWatcher()
	removeStateWatcher()
	removeKickedWatcher()
	removeSettingsCategoryWatcher()
	removeSettingsModeWatcher()
	removeSettingsQuestionDraftingWatcher()
	removeSettingsRoundsWatcher()
	removeSettingsSpeedWatcher()
	removeOwnPlayerWatcher()
	removeSettingsDifficultyWatcher()
	removeSettingsPublicWatcher()
	removeSettingsRoomNameWatcher()
	removeHostChangeWatcher()
}

function playersWatcher(snapshot) {
	const vals = snapshot.val()
	if (vals === null) return
	store.dispatch(setPlayers(decodeFirebaseArray(vals)))
}

/**
 * Adds a players watcher
 * Dispatches decoded players to the store
 */
export function addPlayersWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/players`).on("value", playersWatcher)
}

/**
 * Adds a players watcher
 * Dispatches decoded players to the store
 */
export function removePlayersWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/players`).off("value", playersWatcher)
}

function ownPlayerWatcher(snapshot) {
	const vals = snapshot.val()
	if (vals === null) return
	store.dispatch(setPlayer(vals))
}

export function addOwnPlayerWatcher() {
	const serverId = store.getState().server.id
	const playerId = store.getState().player.playerId
	db.ref(`rooms/${serverId}/players/${playerId}`).on("value", ownPlayerWatcher)
}

export function removeOwnPlayerWatcher() {
	const serverId = store.getState().server.id
	const playerId = store.getState().player.playerId
	db.ref(`rooms/${serverId}/players/${playerId}`).off("value", ownPlayerWatcher)
}

/* function settingsWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setState(val))
}

function addSettingsWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings`).on("value", settingsWatcher)
}

function removeSettingsWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings`).off("value", settingsWatcher)
} */

function settingsCategoryWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "category", value: val }))
}

function settingsModeWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "gamemode", value: val }))
}
function settingsRoundsWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "numberOfRounds", value: val }))
}

function settingsQuestionDraftingWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "questionDrafting", value: val }))
}

function settingsSpeedWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "speed", value: val }))
}

function settingsDifficultyWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "difficulty", value: val }))
}

function settingsPublicWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "public", value: val }))
}

function settingsRoomNameWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setSetting({ setting: "roomName", value: val }))
}

function addSettingsCategoryWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/category`).on("value", settingsCategoryWatcher)
}

function addSettingsModeWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/gamemode`).on("value", settingsModeWatcher)
}

function addSettingsRoundsWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/numberOfRounds`).on("value", settingsRoundsWatcher)
}

function addSettingsQuestionDraftingWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/questionDrafting`).on("value", settingsQuestionDraftingWatcher)
}

function addSettingsSpeedWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/speed`).on("value", settingsSpeedWatcher)
}

function addSettingsDifficultyWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/difficulty`).on("value", settingsDifficultyWatcher)
}

function addSettingsPublicWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/public`).on("value", settingsPublicWatcher)
}

function addSettingsRoomNameWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/roomName`).on("value", settingsRoomNameWatcher)
}

function removeSettingsCategoryWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/category`).off("value", settingsCategoryWatcher)
}

function removeSettingsModeWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/gamemode`).off("value", settingsModeWatcher)
}

function removeSettingsRoundsWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/numberOfRounds`).off("value", settingsRoundsWatcher)
}

function removeSettingsQuestionDraftingWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/questionDrafting`).off("value", settingsQuestionDraftingWatcher)
}

function removeSettingsSpeedWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/speed`).off("value", settingsSpeedWatcher)
}

function removeSettingsDifficultyWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/difficulty`).off("value", settingsDifficultyWatcher)
}

function removeSettingsPublicWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/public`).off("value", settingsPublicWatcher)
}

function removeSettingsRoomNameWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/settings/roomName`).off("value", settingsRoomNameWatcher)
}

function stateWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	store.dispatch(setState(val))
}

/**
 * Adds a state watcher
 * Ensures that correct state for the game is watched
 */
function addStateWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/state`).on("value", stateWatcher)
}

/**
 * Adds a state watcher
 * Ensures that correct state for the game is watched
 */
function removeStateWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/state`).off("value", stateWatcher)
}

function kickedWatcher(snapshot) {
	const val = snapshot.val()
	if (val === null) return
	const playerState = store.getState().player

	const leavingPlayerName = store.getState().server.players.find(e => e.playerId === val.playerId).playerName

	if (val.playerId === playerState.playerId) {
		notifyWarning("You have been kicked")
		leaveServer()
	} else {
		notifySuccess(leavingPlayerName + " left the game")
	}
}

function addKickedWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/players`).on("child_removed", kickedWatcher)
}

function removeKickedWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/players`).off("child_removed", kickedWatcher)
}

function hostChangeWatcher(snapshot) {
	const val = snapshot.val()
	const server = store.getState().server
	if (server.host == null) store.dispatch(setHost(val))
	else {
		store.dispatch(setHost(val))
		const newHost = store.getState().server.players.find(player => player.playerId === val)
		notifyInfo("The host left, a new host has been assigned: " + newHost.playerName)
	}
}

function addHostChangeWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/host`).on("value", hostChangeWatcher)
}

function removeHostChangeWatcher() {
	const serverId = store.getState().server.id
	db.ref(`rooms/${serverId}/host`).off("value", hostChangeWatcher)
}

function publicRoomsWatcher(snapshot) {
	const vals = snapshot.val()
	if (vals === null) return

	const publicRooms = decodePublicRooms(vals)
	store.dispatch(setRooms(publicRooms))
}

export function addPublicRoomsWatcher() {
	db.ref(`/`).on("child_added", publicRoomsWatcher)
	db.ref(`/`).on("child_removed", publicRoomsWatcher)
}

export function removePublicRoomsWatcher() {
	db.ref(`/`).off("child_added", publicRoomsWatcher)
	db.ref(`/`).off("child_removed", publicRoomsWatcher)
}
