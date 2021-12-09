import { db } from "../api/fireSource"


export const categoryObj = {
    "Mixed": 0,
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
    "Mythology": 20,
    "Sports": 21,
    "Geography": 22,
    "History": 23,
    "Politics": 24,
    "Art": 25,
    "Celebrities": 26,
    "Animals": 27,
    "Vehicles": 28,
    "Entertainment: Comics": 29,
    "Science: Gadgets": 30,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32
}


/*


export const settings = [
]

*/


export const settings = {
    nrOfRounds: {
        name: "nrOfRounds",
        label: "Number of Rounds",
        type: "number",
        default: 12
    },
    gamemode: {
        name: "gamemode",
        label: "Gamemode",
        type: "select",
        options: ['normal', 'first-to-answer', 'themed'],
        default: 'normal'
    },
    questionDrafting: {
        name: "questionDrafting",
        label: "Question Drafting",
        type: "checkbox",
        default: true
    },

    speed: {
        name: "speed",
        label: "Speed",
        type: "select",
        options: ["grandma", "default", "quick", "supersonic"],
        default: "default"
    },

    category: {
        name: "category",
        label: "Category",
        type: "select",
        options: Object.keys(categoryObj),
        default: "Mixed"
    },

    difficulty: {
        name: "difficulty",
        label: "Difficulty",
        type: "select",
        options: ["easy", "medium", "hard", "mixed"],
        default: "mixed"
    }
}

export async function updateServerSetting(setting, value, serverId) {
    await db.ref(`rooms/${serverId}/settings/${setting}/`).set(value)
}

export async function resetServerSettings(settings, serverId) {
    await db.ref(`rooms/${serverId}/settings/`).set(settings)
}

