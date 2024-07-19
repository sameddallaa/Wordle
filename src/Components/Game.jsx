import React, { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";
import Grid from "./Grid";
const Game = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0
  );
  useEffect(() => {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
  }, [score]);
  return (
    <div className="bg-secondary rounded p-2">
      <Scoreboard highScore={highScore} score={score} />
      <Grid setScore={setScore} setHighScore={setHighScore} />
    </div>
  );
};

export default Game;
