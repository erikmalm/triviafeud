import Join from "../components/join.js"

import { main } from "../styles/quickJoin.module.css"
import { randomName } from "../styles/startPage.module.css"

import { DiceIcon } from "../icons/"

/**
 * Used when joining a server via an invite link
 * Allows the user to set their name before joining
 *
 * @param {*} param0
 * @returns
 */

export default function QuickJoinView({ userName, setUserName, onSubmit, generateRandomName, status }) {
	return (
		<div className={main}>
			<h2>Join server</h2>
			<Join onSubmit={e => onSubmit(e)} setUserName={setUserName} userName={userName} status={status} />
			<button className={randomName} type="button" onClick={generateRandomName}>
				Generate random name
				<DiceIcon fill="#fff" />
			</button>
		</div>
	)
}
