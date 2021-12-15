import { nanoid } from "nanoid"

import { countWords } from "./util"

import { db } from "../api/fireSource"

import { SPEED_MULTIPLIERS } from "./settingsUtil"

/* 
{
	"category": "General Knowledge",
	"type": "multiple",
	"difficulty": "easy",
	"question": "Which of the following card games revolves around numbers and basic math?",
	"correct_answer": "Uno",
	"incorrect_answers": [
		"Go Fish",
		"Twister",
		"Munchkin"
	]
} 
-> 
{
	"category": "General Knowledge",
	"type": "multiple",
	"difficulty": "easy",
	"question": "Which of the following card games revolves around numbers and basic math?",
	"answers": [
		{
			text: "Go Fish",
			id: id
		},

	]
	"correct_answer": id
}
*/

/**
 * Decodes a question from the API and shuffles the answers and stores
 * the question and its respective answer in a new object (decoded)
 *
 * @param {Object} question
 * @returns the decoded question
 */

export function formatQuestion(question) {
	const decoded = decodeQuestion(question)
	decoded.answers = [decoded.correct_answer, ...decoded.incorrect_answers].map(answer => ({
		text: answer,
		id: nanoid(),
	}))

	decoded.correctAnswer = decoded.answers[0].id

	/* Answers for multiple choice questions should be shuffled
    and booleans should always be listed as: [True] [False] */
	if (question.type === "multiple") decoded.answers = decoded.answers.sort(() => Math.random() - 0.5)
	else if (question.type === "boolean")
		decoded.answers = decoded.answers.sort(answer => (answer.text === "True" ? -1 : 1))

	/* Delete unused object parts from API */
	delete decoded.incorrect_answers
	delete decoded.correct_answer

	return decoded
}

/**
 * Removes URI-encoding from question object
 * @param {Object} question the question to be decoded
 */
function decodeQuestion(question) {
	return {
		...question,
		category: decodeURIComponent(question.category),
		question: decodeURIComponent(question.question),
		correct_answer: decodeURIComponent(question.correct_answer),
		incorrect_answers: question.incorrect_answers.map(answer => decodeURIComponent(answer)),
	}
}

// Helper util save to firebase when fetching question via API
export async function saveQuestionToFirebase(serverId, question) {
	await db.ref(`rooms/${serverId}/game/currentQuestion/question`).set(question)
}

export async function resetCurrentDrafter(serverId) {
	await db.ref(`rooms/${serverId}/game/currentDrafter`).set(null)
}

export const VISUAL_COUNT_DOWN_TIME = 3000
const AVERAGE_WORDS_PER_SECONDS = 4.166666666

export function calculateQuestionTimeout(question, settings) {
	const words = countWords([question.question, ...question.answers.map(a => a.text)].join(" "))
	const timeToRead = (words / AVERAGE_WORDS_PER_SECONDS) * 1000
	const reactionTime = 1000
	const decisionTime = 3000

	return VISUAL_COUNT_DOWN_TIME + reactionTime + (timeToRead + decisionTime) * SPEED_MULTIPLIERS[settings.speed]
}
