import styles from '../styles/lobbyActions.module.css'


export default function LobbyActionsView({copyInviteLink, handleStart, toggleReady, leaveLobby, player, participants}) {
    
    return (
        <div>
            <div className={styles.invite}>
                <input type="text" value={window.location.href} readOnly></input>
                <button 
                    onClick={() => copyInviteLink()}
                >Copy</button>
            </div>
            <div className={styles.buttons}>
                <button className={styles.primary} onClick={() => toggleReady()}>{player.ready ? "Not ready" : "Ready"}</button>
                <button className={styles.secondary} onClick={() => leaveLobby()}>EXIT</button>
                {player.role === "host" && (
                    <button onClick={() => handleStart()} className={`${styles.secondary} ${styles.start}`}  disabled={!participants.every(participant => participant.ready)}>START</button>
                )}
            </div>
        </div>
    )
}
