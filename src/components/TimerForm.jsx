function TimerForm ({ setTimer, timer }) {
    return (
        <section>
        <h3>Durée de la partie:</h3>
        <form>
            <label>
                Minutes:
                <input type="number" onChange={setTimer} value={timer / 60}/>   
            </label>
            <button type="submit" >Valider</button>
        </form>
      </section>
    )
}

export default TimerForm;