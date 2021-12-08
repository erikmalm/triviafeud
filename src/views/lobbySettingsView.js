import styles from "../styles/settingsView.module.css"

export default function LobbySettingsView({ toggleSettings }) {
	return (
		<div className={styles.wrapper}>
			<button onClick={toggleSettings}>x</button>
			<select>
				<option></option>
			</select>
			{/*
			<div className="top">
				<p>Game settings</p>
				<button onClick={() => closeSettings()}>x</button>
			</div>
			<div className={styles.mode}>
				<label htmlFor={styles.model}>Mode</label>
				<select>
					<option value="themed">Themed Questions</option>
					<option value="first">First to Answer</option>
					<option value="speed">Speedround</option>
				</select>
			</div>
			<div className={styles.toggle}>
				<label className={styles.switch}>
					<input type="checkbox"></input>
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
			</div>
			<div className={styles.difficulty}>
				<label htmlFor={styles.difficulty}>Difficulty</label>
				<select>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hast">Hard</option>
				</select>
			</div>
			<div className={styles.speed}>
				<label htmlFor={styles.speed}>Speed</label>
				<select>
					<option value="grandma">Grandma</option>
					<option value="average">Average</option>
					<option value="fast">Fast</option>
				</select>
			</div>
			<div className={styles.category}>
				<label htmlFor={styles.category}>Category</label>
				<select>
					<option>Mixed</option>
				</select>
			</div>
			<div className={styles.buttons}>
				<button>Default</button>
				<button>Apply</button>
			</div>
			*/}
		</div>
	)
}
