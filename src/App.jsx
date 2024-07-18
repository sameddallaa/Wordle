import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./Components/Grid";
import Scoreboard from "./Components/Scoreboard";
import Game from "./Components/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Game>
        <Scoreboard />
        <Grid />
      </Game>
    </>
  );
}

export default App;
