import { useState } from "react";
import ClockPage from "./container/ClockPage.jsx";
import "./App.css";

function App() {
  const [gameStatus, setGameStatus] = useState("STANDBY");

  return (
    <div className="App">
      <h1>Horloge pour jouer aux échecs!</h1>
      <ClockPage gameStatus={gameStatus} setGameStatus={setGameStatus} />
    </div>
  );
}

export default App;
