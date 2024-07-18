import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "./Row";
import { generate } from "random-words";
const Grid = ({ theme }) => {
  const [letters, setLetters] = useState([]);
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cellWord, setCellWord] = useState([]);
  const [word, setWord] = useState([]);
  const [done, setDone] = useState([]);
  const handleKeyDown = (e) => {
    if (e.key.length === 1 && /^[a-zA-Z]$/i.test(e.key) && letters.length < 5) {
      setLetters((prevLetters) => [...prevLetters, e.key.toLowerCase()]);
      setCounter((prevCounter) => prevCounter + 1);
    }
    if (e.key === "Backspace" && letters.length > 0) {
      setLetters((prevLetters) => prevLetters.slice(0, -1));
      setCounter((prevCounter) => prevCounter - 1);
    }
    if (e.key === "Enter" && letters.length === 5) {
      setDone((prevDone) => [...prevDone, true]);
      setAnswers(
        letters.map((letter, index) =>
          letter === word[index]
            ? "in correct spot"
            : word.includes(letter)
            ? "correct letter"
            : "wrong letter"
        )
      );
      if (counter < 30) {
        setLetters([]);
      }
    }
  };

  useEffect(() => {
    console.log(word);
  }, [word]);

  useEffect(() => {
    console.log(done);
  }, [counter]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [letters]);

  useEffect(() => {
    setWord(generate({ minLength: 5, maxLength: 5 }).split(""));
  }, []);

  return (
    <>
      <Container>
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row
            key={row}
            row={row}
            letters={letters}
            answers={answers}
            turn={Math.floor((counter - 1) / 5) === row}
            counter={counter}
            done={done[row]}
          />
        ))}
      </Container>
    </>
  );
};

export default Grid;
