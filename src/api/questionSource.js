import store from "../redux/store"
import { categoryObj } from "../util/settingsUtil"

const API_BASE_URL = "https://opentdb.com/api.php"


 // https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&encode=url3986

   export async function getQuestion() {
      const { category, difficulty } = store.getState().settings
      const categoryVal = categoryObj[category]
      const params = {
         amount: 1, 
         category: categoryVal, 
         difficulty: difficulty,
         encode: "url3986"
      }
      if (categoryVal === 0) delete params.category
      if (difficulty === "mixed") delete params.difficulty
      console.log(`${API_BASE_URL}?${new URLSearchParams(params)}`)
      const res = await fetch (`${API_BASE_URL}?${new URLSearchParams(params)}`)
      const data = await res.json()
      return data.results
   }


   export async function getQuestions({ amount = 1 }) {
      
      const { category, difficulty } = store.getState().settings
      const categoryVal = categoryObj[category]
      const params = {
         amount: amount, 
         category: categoryVal, 
         difficulty: difficulty,
         encode: "url3986"
      }
      if (categoryVal === 0) delete params.category
      if (difficulty === "mixed") delete params.difficulty
      console.log(`${API_BASE_URL}?${new URLSearchParams(params)}`)
      const res = await fetch (`${API_BASE_URL}?${new URLSearchParams(params)}`)
      const data = await res.json()
      return data.results
   }



