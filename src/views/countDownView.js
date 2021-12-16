import { VISUAL_COUNT_DOWN_TIME } from "../util/questionUtil"

import { ready, set, go } from "../styles/question.module.css"

export default function CountDownView({ timePassed, timerState }) {
	if (timerState == null || timePassed < VISUAL_COUNT_DOWN_TIME / 3) return <div className={ready}>Ready</div>

	if (timePassed < (VISUAL_COUNT_DOWN_TIME * 2) / 3) return <div className={set}>Set</div>

	return <div className={go}>Go</div>
}
