import { useState } from "react";
import ClockPage from "./container/Main.jsx";
import "./App.css";

function App() {
  // 4 possibilities for gameStatus: 
  // STANDBY = Settings phase
  // STARTED = All set, waiting for First push.
  // PLAYING = countdowns running to 0.
  // FINISHED = one clock reached 0.
  const [gameStatus, setGameStatus] = useState("STANDBY");

  return (
    <div className="App">
      <h1>Horloge pour jouer aux échecs!</h1>
      <ClockPage gameStatus={gameStatus} setGameStatus={setGameStatus} />
    </div>
  );
}

export default App;
