export default function PublicRooms({ publicRooms, handleRoomClick }) {
	if (publicRooms.rooms == null || publicRooms.rooms.length === 0) {
		return null //<div>No public rooms</div>
	}

	return (
		<div>
			{publicRooms.rooms.map(e => (
				<span onClick={() => handleRoomClick(e.serverId)} value={publicRooms.serverId}>
					{e.settings.roomName}
				</span>
			))}
		</div>
	)
}

// {waitingForPlayers.map(player => <div>{player.playerName}</div>)}
