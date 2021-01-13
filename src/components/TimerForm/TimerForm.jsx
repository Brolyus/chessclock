import classes from './TimerForm.module.css'

function TimerForm({ setTimer, timer, setGameStatus }) {
  const classicTimers = ["1:00", "3:00", "5:00","10:00", "15:00", "30:00", "45:00", "60:00", "120:00"];
  return (
    <section className={classes.gameDuration}>
      <h3>Durée de la partie:</h3>
      <ul>
        {classicTimers.map((time, i) => {
          return (
            <li className={classes.duration} onClick={setTimer} key={i}>
              {time}
            </li>
          );
        })}
      </ul>
      <form>
        <label>
          Cadence sélectionnée (en minutes):
          <input
            type="number"
            onChange={(event) => setTimer(event, true)}
            value={timer / 60}
          />
          <p>Modifiez si vous voulez une cadence personnalisée. Le maximum est à 120 minutes</p>
        </label>
      </form>
      <button onClick={() => setGameStatus("STARTED")}>
        Démarrer l'horloge
      </button>
    </section>
  );
}

export default TimerForm;
