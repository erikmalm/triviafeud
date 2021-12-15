import Join from "../components/join.js"
import Host from "../components/host.js"

import styles from "../styles/startPage.module.css"
import { DiceIcon, HelpIcon } from "../icons/index.js"

export default function StartPageView({
	generateRandomName,
	userName,
	setUserName,
	serverId,
	setServerId,
	joinServer,
	hostServer,
	startOption,
	setStartOption,
	publicRoom,
	setPublicRoom,
}) {
	const hostForm = (
		<Host
			onSubmit={hostServer}
			userName={userName}
			setUserName={name => setUserName(name)}
			publicRoom={publicRoom}
			setPublicRoom={setPublicRoom}
		/>
	)
	const joinForm = (
		<Join
			onSubmit={joinServer}
			userName={userName}
			setUserName={name => setUserName(name)}
			serverId={serverId}
			setServerId={id => setServerId(id)}
		/>
	)
	return (
		<div className={styles.main}>
			<div>
				<div className={styles.tabs}>
					<button
						className={startOption === START_OPTIONS.host ? styles.active : ""}
						onClick={() => setStartOption(START_OPTIONS.host)}
					>
						Host
					</button>
					<button
						className={startOption === START_OPTIONS.join ? styles.active : ""}
						onClick={() => setStartOption(START_OPTIONS.join)}
					>
						Join
					</button>
				</div>
				{window.innerWidth > 800 ? (
					<div className={styles.formCols}>
						{hostForm}
						{joinForm}
					</div>
				) : startOption === START_OPTIONS.host ? (
					hostForm
				) : (
					joinForm
				)}

				<button className={styles.randomName} type="button" onClick={() => generateRandomName()}>
					Generate random name
					<DiceIcon fill="#fff" />
				</button>
				<button className={styles.help}>
					<HelpIcon fill="var(--gray)" />
					How it works
				</button>
			</div>
			<span>Tm stuff</span>
		</div>
	)
}

export const START_OPTIONS = {
	join: "JOIN",
	host: "HOST",
}
