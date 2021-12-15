import { ToggleOffIcon, ToggleOnIcon } from "../icons"

import styles from "./checkBox.module.css"

export default function CheckBox({ checked, colorOff, colorOn, ...props }) {
	return (
		<label className={styles.main}>
			{checked ? <ToggleOnIcon color={colorOn} width="30" /> : <ToggleOffIcon color={colorOff} width="30" />}
			<input className={styles.input} type={"checkbox"} checked={checked} {...props} />
		</label>
	)
}
