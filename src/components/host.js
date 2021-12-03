import { form } from "../styles/startPage.module.css"

export default function Host({ onSubmit, userName, setUserName }) {
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
			<input type={"submit"} value={"Begin"} />
		</form>
	)
}
