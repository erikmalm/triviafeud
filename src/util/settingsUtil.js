import { db } from "../api/fireSource"

export const categoryObj = {
	Mixed: 0,
	"General Knowledge": 9,
	"Entertainment: Books": 10,
	"Entertainment: Film": 11,
	"Entertainment: Music": 12,
	"Entertainment: Musicals & Theatres": 13,
	"Entertainment: Television": 14,
	"Entertainment: Video Games": 15,
	"Entertainment: Board Games": 16,
	"Science & Nature": 17,
	"Science: Computers": 18,
	"Science: Mathematics": 19,
	Mythology: 20,
	Sports: 21,
	Geography: 22,
	History: 23,
	Politics: 24,
	Art: 25,
	Celebrities: 26,
	Animals: 27,
	Vehicles: 28,
	"Entertainment: Comics": 29,
	"Science: Gadgets": 30,
	"Entertainment: Japanese Anime & Manga": 31,
	"Entertainment: Cartoon & Animations": 32,
}

export const SPEED_MULTIPLIERS = {
	grandma: 2,
	default: 1,
	quick: 0.5,
	supersonic: 0.25,
}

export const QUESTION_DRAFTING = "question drafting"
export const RANDOM_QUESTIONS = "random questions"
export const FIRST_TO_ANSWER = "first to answer"

export const settings = [
	{
		name: "roomName",
		label: "Room Name",
		type: "text",
		default: "",
	},
	{
		name: "numberOfRounds",
		label: "Number of Rounds",
		type: "number",
		default: 12,
	},
	{
		name: "gamemode",
		label: "Gamemode",
		type: "select",
		options: [QUESTION_DRAFTING, RANDOM_QUESTIONS, FIRST_TO_ANSWER],
		default: QUESTION_DRAFTING,
	},
	{
		name: "trueFalse",
		label: "True/False",
		type: "checkbox",
		default: "off",
	},
	{
		name: "speed",
		label: "Tempo",
		type: "select",
		options: ["grandma", "default", "quick", "supersonic"],
		default: "default",
	},
	{
		name: "category",
		label: "Category",
		type: "select",
		options: Object.keys(categoryObj),
		default: "mixed",
	},
	{
		name: "difficulty",
		label: "Difficulty",
		type: "select",
		options: ["easy", "medium", "hard"],
		default: "medium",
	},
	{
		name: "public",
		label: "Public",
		type: "checkbox",
		default: "off",
	},
]

export async function updateServerSetting(setting, value, serverId) {
	await db.ref(`rooms/${serverId}/settings/${setting}/`).set(value)
}

export async function resetServerSettings(settings, serverId) {
	await db.ref(`rooms/${serverId}/settings/`).set(settings)
}
