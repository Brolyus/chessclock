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
    console.log("entered");
    let newPlayersInfo = players.map((player) => {
      if (color === player.color) {
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
    console.log("in");
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

  function setTimer(event) {
    let newTime = event.target.value * 60;
    if (event.target.value >= 1) {
      let newPlayersInfo = players.map((player) => {
        player.timer = newTime;
        return player;
      });
      return setPlayers(newPlayersInfo);
    }
  }

  function reversePlayers() {
    return setPlayers([...players.reverse()]);
  }

  useInterval(() => {
    if (gameStatus === "STARTED") {
      updateTimer();
    }
  }, 1000);

  return (
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
      <button onClick={() => reversePlayers()}>Inverser</button>
      <TimerForm setTimer={setTimer} timer={players[0].timer} />
    </div>
  );
}

export default ClockPage;
