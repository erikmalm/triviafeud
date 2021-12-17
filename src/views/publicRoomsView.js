import { LoginIcon } from "../icons"
import styles from "../styles/publicRooms.module.css"

export default function PublicRoomsView({ publicRooms, handleRoomClick }) {
	if (publicRooms.rooms == null || publicRooms.rooms.length === 0) {
		return null
	}

	return (
		<div className={styles.main}>
			<h2>Public rooms</h2>
			<div className={styles.rooms}>
				{publicRooms.rooms.map(e => (
					<div
						className={styles.room}
						onClick={() => handleRoomClick(e.serverId)}
						key={e.serverId}
						value={e.serverId}
					>
						{e.roomName}
						<LoginIcon width="18" color="var(--green)" />
					</div>
				))}
			</div>
		</div>
	)
}
