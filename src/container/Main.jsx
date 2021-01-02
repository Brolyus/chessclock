import { useState } from "react";
import Clock from "../components/Clock.jsx";
import TimerForm from "../components/TimerForm.jsx";
import useInterval from "../functions/useInterval.js";

function ClockPage({ gameStatus, setGameStatus }) {
  const [players, setPlayers] = useState([
    {
      status: "PLAYING",
      timer: 300,
      color: "Blancs",
    },
    {
      status: "STANDBY",
      timer: 300,
      color: "Noirs",
    },
  ]);

  function changePlayerStatus(color) {
    if (gameStatus === "STARTED") setGameStatus("PLAYING")
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
    if (!customTime) {
      let newTimeArray = event.target.innerHTML.split(":");
      let minutes = newTimeArray[0];
      let seconds = newTimeArray[1];

      let newTime = minutes * 60 + parseInt(seconds);
      return updatePlayersTimer(newTime);
    } else {
      let newTime = event.target.value * 60;
      if (event.target.value >= 1) {
        return updatePlayersTimer(newTime);
      }
    }
  }

  function updatePlayersTimer(newTime) {
    if (newTime > (120*60)) newTime = (120*60)
    let newPlayersInfo = players.map((player) => {
      player.timer = newTime;
      return player;
    });
    return setPlayers(newPlayersInfo);
  }

  function reversePlayers() {
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
      {players.map((player, i) => {
        return (
          <section key={i} onClick={() => changePlayerStatus(player.color)}>
            <p>Joueur: {player.color}</p>
            <Clock
              timer={player.timer}
              color={player.color}
              status={player.status}
            />
          </section>
        );
      })}
      {gameStatus === "STARTED" &&
        <>
          <button onClick={() => reversePlayers()}>Inverser le côté</button>
          <p>Appuyer sur noir pour démarrer la pendule. Appuyer sur votre couleur une fois votre coup joué pour démarrer la pendule adverse</p>
          <p>Le joueur dont le compteur tombe à zéro perd la partie.</p>
        </>
      }
    </div>
  );
}

export default ClockPage;
