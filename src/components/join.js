import { form } from "../styles/startPage.module.css"

import { API_STATES } from "../api"

export default function Join({ onSubmit, userName, setUserName, serverId, setServerId, status }) {
	return (
		<form className={form} onSubmit={e => onSubmit(e)}>
			{serverId == null || (
				<div>
					<label htmlFor="serverId">Server-id</label>
					<input autoComplete="off" id="serverId" type={"text"} onInput={e => setServerId(e.target.value)} />
				</div>
			)}
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

			<input type={"submit"} value={"Join"} disabled={status === API_STATES.PENDING} />
		</form>
	)
}
