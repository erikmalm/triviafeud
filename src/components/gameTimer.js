import styles from './gameTimer.module.css'

export default function GameTimer({time, startTime}) {
    console.log(time)
    //console.log(startTime)
    return (
        <div className={styles.main}>
            <div className={styles.pill} style={{'--scale': time / startTime}}></div>
            <h1 className={styles.text}>{Math.round(time)}</h1>
        </div>
    )
}