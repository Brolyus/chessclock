function Clock ({timer = 300, color, status}) {
    let minutes = Math.floor(timer / 60)
    let seconds = timer % 60
    return (
        <p>Timer: {`${minutes} : ${seconds < 10 ? ('0' + seconds) : seconds }`}</p>
    )
}

export default Clock;