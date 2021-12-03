export default function RoundResultsView({ participants }) {
	return (
		<div className="roundResWrapper">
			<h1> Trivia Feud </h1>
			<div className="roundResParticipants">
				{participants.map(p => (
					<p className={`lobbyParticipant + ${participants.recScor}`} key={p}>
						p
					</p>
				))}
			</div>
			<div className="roundResButtons"></div>
			<div className="roundResHelp">
				<button onClick={() => lobbyHelp()}>?</button>
			</div>
		</div>
	)
}
