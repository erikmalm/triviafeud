import { VISUAL_COUNT_DOWN_TIME } from "../util/questionUtil"

export default function CountDownView({ timePassed, timerState }) {
	return (
		<div>
			<h2>
				{timerState == null || timePassed < VISUAL_COUNT_DOWN_TIME / 3
					? "Ready..."
					: timePassed < (VISUAL_COUNT_DOWN_TIME * 2) / 3
					? "Set..."
					: "Go!"}
			</h2>
		</div>
	)
}

// console.log("timepassed: " + timePassed)

/**
 * 
 * 	if (timerState == null || timePassed < VISUAL_COUNT_DOWN_TIME / 3)
		return <div className={styles.playerResult}>Ready</div>

	if (timePassed < (VISUAL_COUNT_DOWN_TIME * 2) / 3) return <div>Set</div>
	return <div>Go</div>
 
	return (


        if ()
		return <div className={styles.playerResult}></div>

	if () return <div></div>
	return <div>Go</div>

    )

 */
