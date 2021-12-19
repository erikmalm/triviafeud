import { API_STATES } from "../api"
import { form, checkbox } from "../styles/startPage.module.css"

import CheckBox from "./checkBox"

export default function Host({ onSubmit, userName, setUserName, publicRoom, setPublicRoom, status }) {
	return (
		<form className={form} onSubmit={e => onSubmit(e)}>
			<div>
				<label htmlFor="userName">Username</label>
				<input
					type={"text"}
					onFocus={e => e.target.select()}
					onInput={e => setUserName(e.target.value)}
					value={userName}
					id="userName"
					autoComplete="off"
				/>
			</div>
			<div className={checkbox}>
				<label htmlFor="public_game">Public game</label>
				<CheckBox
					colorOff="#fff"
					colorOn="var(--green)"
					id="public_game"
					checked={publicRoom}
					onChange={() => setPublicRoom(!publicRoom)}
				/>
			</div>
			<input type={"submit"} value={"Begin"} disabled={status === API_STATES.PENDING} />
		</form>
	)
}

//
