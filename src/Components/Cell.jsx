import React, { useState, useEffect } from "react";
import classes from "../CSS/Cell.module.css";

const Cell = ({ letter = "", turn, color, done, cellLetter }) => {

  const [cellColor, setCellColor] = useState();
  useEffect(() => {
    setCellColor(color);
  }, [done]);
  return (
    <div
      style={{ width: "60px", height: "60px" }}
      className={`bg-${
        done ? cellColor + ` ${classes.animate}` : "primary"
      } rounded d-flex align-items-center justify-content-center`}
    >
      <span className="text-light">
        {(cellLetter && cellLetter.letter) || ((turn || done) && letter)}
      </span>
    </div>
  );
};

export default Cell;
