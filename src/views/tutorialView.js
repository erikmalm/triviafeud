import { CrossIcon } from '../icons'
import styles from '../styles/startPage.module.css'

export default function TutorialView({close}) {
    return (
        <div className={styles.tutorial}>
            <div className={styles.topBar}>
                <h2>Tutorial</h2>
                <button onClick={() => close()}><CrossIcon color="#fff" /></button>
            </div>
            <h3>Getting started</h3>
            <p>To get started with trivia feud. Either find some friends to play with or join a public room. If there are any public rooms available, they will be shown at the bottom of the start page.</p>
            <h3>Hosting a game</h3>
            <p>To host a game, enter your name and press "begin", in the lobby you can then change game settings by pressing the settings symbol. Available settings are</p>
            <ul>
                <li><b>Public</b> If this is on, the room will be shown of the start page so random people will be able to join</li>
                <li><b>Room name</b> Change the name of the room. The name is shown in the public rooms list on the start page</li>
                <li><b>Number of Rounds</b> Number of questions the players will answer in one game</li>
                <li>
                    <b>Gamemode</b>
                    <ul>
                        <li>Normal - Players will receive score based on how fast they answer</li>
                        <li>First to answer - Only the player who answers first will get score</li>
                        <li>True/false - Same as normal but with only true/false questions</li>
                    </ul>
                </li>
                <li><b>Question Drafting</b> If on, a randomly selected player can decide which question (out of 4) all players will get</li>
                <li><b>Tempo</b> Changes how much time players will have to answer each question</li>
                <li><b>Category</b> If not "mixed" questions will be related to the selected category</li>
                <li><b>Difficulty</b> Changes the difficulty if the questions</li>
            </ul>
            <h3>Gameplay</h3>
            <p>When the game is started if question drafting is on, a random player will have to select a question while the other players wait. After a question is decided (or if question drafting is off) The same question will appear for all players. The players job is to answer this as fast as possible.</p>
            <p>After every round, statistics will be presented. Here everyone can view if the other players answered correct and how much the score is calculated</p>
            <p>If the gamemode is either normal or true/false, the score is calculated by giving a fixed number of points for answering correctly and adding extra points for answering quickly</p>
            <button onClick={() => close()}>Got it</button>
        </div>
    )
}