import { nanoid } from "nanoid"

// Firebase
import { db } from "../api/fireSource"

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

	/* Multiple choice should be shuffled
    and booleans [True] [False] */
	if (question.type === "multiple") decoded.answers = shuffle(decoded.answers)
	else if (question.type === "boolean")
		decoded.answers = decoded.answers.sort(answer => (answer.text === "True" ? -1 : 1))

	delete decoded.incorrect_answers
	delete decoded.correct_answer
	return decoded
}

// Function to shuffle a list
// Found on the interwebz  ...wow!
// https://flaviocopes.com/how-to-shuffle-array-javascript/

function shuffle(list) {
	return list.sort(() => Math.random() - 0.5)
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
