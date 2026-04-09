import { useState } from "react";
import Title from "./Title";
import FireButton from "./FireButton";
import Results from "./Results";
import Player from "./Player";
import "./App.css";

export default function App() {
  const [p1Health, setP1Health] = useState(100);
  const [p2Health, setP2Health] = useState(100);

  let status = "playing";
  if (p1Health <= 0 && p2Health <= 0) status = "draw";
  else if (p1Health <= 0) status = "p2wins";
  else if (p2Health <= 0) status = "p1wins";
  const gameOver = status !== "playing";

  const handleFire = () => {
    if (gameOver) {
      setP1Health(100);
      setP2Health(100);
      return;
    }

    // Random damage between 1 and 35 for each player
    const damage1 = Math.floor(Math.random() * 35) + 1;
    const damage2 = Math.floor(Math.random() * 35) + 1;

    // Math.max(0, ...) makes sure health never goes below 0
    setP1Health((prev) => Math.max(0, prev - damage1));
    setP2Health((prev) => Math.max(0, prev - damage2));
  };

  return (
    <div className="App">
      <div className="Top">
        <Title />
      </div>
      <div className="Middle">
        <div className="left">
          <Player playerName="Player 1" health={p1Health} color="green" />
        </div>
        <div className="Center">
          <FireButton onFire={handleFire} gameOver={gameOver} />
        </div>
        <div className="Right">
          <Player playerName="Player 2" health={p2Health} color="red" />
        </div>
      </div>
      <div className="Bottom">
        <Results status={status} />
      </div>
    </div>
  );
}
