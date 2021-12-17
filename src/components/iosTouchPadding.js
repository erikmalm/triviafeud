import styles from "./iosTouchPadding.module.css"

import { DownIcon } from "../icons"

export default function IosTouchPadding({ children }) {
	const iOSiPadOS =
		/^iP/.test(navigator.platform) || (/^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4)

	if (!iOSiPadOS) return <div className={styles.content}>{children}</div>

	return (
		<div>
			<div className={styles.message}>
				<h2>Scroll down to play</h2>
				<DownIcon color="#000" />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
