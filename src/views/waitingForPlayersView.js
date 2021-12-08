export default function WaitingForPlayersView({ waitingForPlayers }) {

	return (
        <>
            <h2>Waiting for {waitingForPlayers.length} players</h2>
            <div>
                {waitingForPlayers.map(player => <div>{player.playerName}</div>)}
            </div>
        </>
    )
}
