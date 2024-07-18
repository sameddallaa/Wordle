import React from "react";

const Cell = ({ letter = "", turn, color, done }) => {
  console.log(done);
  return (
    <div
      style={{ width: "60px", height: "60px" }}
      className={`bg-${color} rounded d-flex align-items-center justify-content-center`}
    >
      <span>{(turn || done) && letter}</span>
    </div>
  );
};

export default Cell;
