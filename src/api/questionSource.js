import store from "../redux/store"
import { categoryObj } from "../util/settingsUtil"

const API_BASE_URL = "https://opentdb.com/api.php"

// https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&encode=url3986

export async function getQuestions({ amount = 1 }) {
	const { category, difficulty, trueFalse } = store.getState().settings
	const categoryVal = categoryObj[category]
	const params = {
		amount: amount,
		category: categoryVal,
		difficulty: difficulty,
		type: "boolean",
		encode: "url3986",
	}
	if (categoryVal === undefined) delete params.category
	if (difficulty === "mixed") delete params.difficulty
	if (trueFalse === "off") delete params.type
	const res = await fetch(`${API_BASE_URL}?${new URLSearchParams(params)}`)
	const data = await res.json()
	return data.results
}
