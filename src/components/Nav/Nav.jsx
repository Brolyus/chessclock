import classes from './Nav.module.css'

function Nav({pauseTimer, setGameStatus, restartGame}) {
    return (
        <nav>
            <ul className={classes.iconNav}>
                <li className={classes.listEl} onClick={restartGame}>Restart</li>
                <li className={classes.listEl} onClick={pauseTimer}>Pause</li>
                <li className={classes.listEl} onClick={() => setGameStatus('FINISHED')}>Stop</li>
            </ul>
        </nav>
    )
}

export default Nav;