import { useState } from "react";
import Clock from "../components/Clock.jsx";
import TimerForm from "../components/TimerForm.jsx";
import useInterval from "../functions/useInterval.js";
import Nav from "../components/Nav";

function ClockPage({ gameStatus, setGameStatus }) {
  const [players, setPlayers] = useState([
    {
      status: "STANDBY",
      timer: 300,
      color: "Blancs",
    },
    {
      status: "STANDBY",
      timer: 300,
      color: "Noirs",
    },
  ]);

  const [looser, setLooser] = useState("");

  const [gameDuration, setGameDuration] = useState();

  function changePlayerStatus(color) {
    if (gameStatus === "STARTED") setGameStatus("PLAYING");
    let newPlayersInfo = players.map((player) => {
      // As chessclock are inverted (Playing white, pressing your button start black countdown), we check the opposite color.
      if (color !== player.color) {
        player.status = "PLAYING";
        return player;
      } else {
        player.status = "STANDBY";
        return player;
      }
    });
    setPlayers(newPlayersInfo);
  }

  function updateTimer() {
    let newPlayersInfo = players.map((player) => {
      if (player.status === "PLAYING" && player.timer > 0) {
        player.timer -= 1;
        if (player.timer === 0) {
          player.status = "STANDBY";
          setLooser(player.color);
          setGameStatus("FINISHED");
          return player;
        }
        return player;
      } else {
        return player;
      }
    });

    return setPlayers(newPlayersInfo);
  }

  function setTimer(event, customTime) {
    if (customTime) {
      let newTime = event.target.value * 60;
      if (event.target.value >= 1) {
        setGameDuration(newTime);
        return updatePlayersTimer(newTime);
      }
    } else {
      let newTimeArray = event.target.innerHTML.split(":");
      let minutes = newTimeArray[0];
      let seconds = newTimeArray[1];

      let newTime = minutes * 60 + parseInt(seconds);
      setGameDuration(newTime);
      return updatePlayersTimer(newTime);
    }
  }

//Start a game with previous game duration, and we invert white and black, as players should invert colors after each games.
  function restartGame() {
    setGameStatus("STARTED");
    let newPlayersInfo = players.map((player) => {
      player.timer = gameDuration;
      return player;
    });
    setPlayers(newPlayersInfo);
    return reversePlayers();
  }
//We prepare to launch a new game with default options
  function launchNewGame() {
    setPlayers([
      {
        status: "STANDBY",
        timer: 300,
        color: "Blancs",
      },
      {
        status: "STANDBY",
        timer: 300,
        color: "Noirs",
      },
    ])
    return setGameStatus('STANDBY')
  }

  function updatePlayersTimer(newTime) {
    if (newTime > 120 * 60) newTime = 120 * 60;
    let newPlayersInfo = players.map((player) => {
      player.timer = newTime;
      return player;
    });
    return setPlayers(newPlayersInfo);
  }

  function pauseTimer() {
    return players.map((player) => (player.status = "STANDBY"));
  }

  function reversePlayers() {
    console.log("ici");
    return setPlayers([...players.reverse()]);
  }

  useInterval(() => {
    if (gameStatus === "PLAYING") {
      updateTimer();
    }
  }, 1000);

  return gameStatus === "STANDBY" ? (
    <TimerForm
      setTimer={setTimer}
      timer={players[0].timer}
      gameStatus={gameStatus}
      setGameStatus={setGameStatus}
    />
  ) : (
    <div>
      <Nav
        pauseTimer={() => pauseTimer()}
        setGameStatus={setGameStatus}
        restartGame={() => restartGame()}
      />
      {players.map((player, i) => {
        return (
          <button key={i} onClick={() => changePlayerStatus(player.color)} className={player.status === "PLAYING" && 'pushed'}>
            <p>Joueur: {player.color}</p>
            <Clock
              timer={player.timer}
              color={player.color}
              status={player.status}
            />
          </button>
        );
      })}
      {gameStatus === "STARTED" && (
        <>
          <button onClick={() => reversePlayers()}>Inverser les côtés</button>
          <p>
            Appuyer sur noir pour démarrer la pendule. Appuyer sur votre couleur
            une fois votre coup joué pour démarrer la pendule adverse
          </p>
          <p>Le joueur dont le compteur tombe à zéro perd la partie.</p>
        </>
      )}
      {gameStatus === "FINISHED" && (
        <section>
          <p>C'est fini{looser && `, ${looser} perd au temps`}!</p>
          <button onClick={() =>restartGame()}>Relancer une partie avec la même cadence</button>
          <button onClick={() =>launchNewGame()}>Relancer une partie avec une nouvelle cadence</button>
        </section>
      )}
    </div>
  );
}

export default ClockPage;
