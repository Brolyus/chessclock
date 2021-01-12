function Nav({pauseTimer, setGameStatus, restartGame}) {
    return (
        <nav>
            <ul>
                <li onClick={restartGame}>Restart</li>
                <li onClick={pauseTimer}>Pause</li>
                <li onClick={() => setGameStatus('FINISHED')}>Stop</li>
            </ul>
        </nav>
    )
}

export default Nav;