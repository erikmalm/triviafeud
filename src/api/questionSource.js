const API_BASE_URL = "https://opentdb.com/api.php"

export async function getQuestion() {
	const res = await fetch(`${API_BASE_URL}?amount=1&encode=url3986`)
	const data = await res.json()
	return data.results[0]
}

export async function getQuestions({ amount = 1 }) {
	const res = await fetch(`${API_BASE_URL}?amount=${amount}&encode=url3986`)
	const data = await res.json()
	return data.results
}

/* EXAMPLE RESPONSE FROM CALL TO https://opentdb.com/api.php?amount=1
{
   "response_code": 0,
   "results": [
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
   ]
}
*/
