import React, { useEffect, useState } from "react";
import { Row as GridRow, Col } from "react-bootstrap";
import Cell from "./Cell";

const Row = ({ row, answers, letters, turn, done, cellWord }) => {
  useEffect(() => {

  }, [answers]);
  return (
    <GridRow className={`py-1`}>
      {[0, 1, 2, 3, 4].map((col) => (
        <Col key={row * 5 + col}>
          <Cell
            className={`px-1`}
            color={
              answers[col] === "in correct spot"
                ? "success"
                : answers[col] === "correct letter"
                ? "warning"
                : answers[col] === "wrong letter"
                ? "danger"
                : "primary"
            }
            number={row * 5 + col}
            letter={letters[col]}
            turn={turn}
            done={done}
            cellLetter={cellWord && cellWord[col]}
          />
        </Col>
      ))}
    </GridRow>
  );
};

export default Row;
