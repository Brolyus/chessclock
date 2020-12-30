function TimerForm ({ setTimer, timer }) {
    return (
        <section>
        <h3>Durée de la partie:</h3>
        <ul>
            <li onClick={setTimer}>1:00</li>
            <li onClick={setTimer}>3:00</li>
            <li onClick={setTimer}>5:00</li>
            <li onClick={setTimer}>15:00</li>
            <li onClick={setTimer}>60:00</li>
            <li onClick={setTimer}>120:00</li>
        </ul>
        <form>
            <label>
                Ou choisir une durée personnalisée:
                <input type="number" onChange={(event) => setTimer(event, true )} value={timer / 60}/>   
            </label>
            <button type="submit" >Valider</button>
        </form>
      </section>
    )
}

export default TimerForm;