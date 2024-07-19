import React from "react";
import { Row, Col } from "react-bootstrap";

const Scoreboard = ({ score, highScore }) => {
  return (
    <Row>
      <Col>
        <div className="bg-light rounded mx-3 my-2">
          <h3>Score</h3>
          <span>{score}</span>
        </div>
      </Col>
      <Col>
        <div className="bg-light rounded mx-3 my-2">
          <h3>High score</h3>
          <span>{highScore}</span>
        </div>
      </Col>
    </Row>
  );
};

export default Scoreboard;
