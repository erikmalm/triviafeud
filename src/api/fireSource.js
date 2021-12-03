// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import { ref, onValue } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase - Getting Started
// http://react-redux-firebase.com/
import "firebase/compat/database"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCNPyd20d0BPf11iXujB7Gl_A-Nhjc9tzw",
	authDomain: "trivia-feud.firebaseapp.com",
	databaseURL: "https://trivia-feud-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "trivia-feud",
	storageBucket: "trivia-feud.appspot.com",
	messagingSenderId: "331010997226",
	appId: "1:331010997226:web:2859ebf3286c186ef99093",
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.database()

/**
 * Returns values from Firebase based on path
 * 
 * @path Path in database from which to get value
 * @returns Promise, resolves with value
 */


export function getValueFromDb(path) {
    return new Promise(resolve => {
		const roomRef = ref(db, path)
		onValue(roomRef, snapshot => {
			resolve(snapshot.val())
		})
	})
}
