import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Row from "./Row";
import { generate } from "random-words";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
const Grid = ({ setScore, setHighScore }) => {
  const [letters, setLetters] = useState([]);
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cellWord, setCellWord] = useState([]);
  const [word, setWord] = useState([]);
  const [done, setDone] = useState([]);
  const [confetti, setConfetti] = useState(false);
  const [lost, setLost] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (answers.length > 0) {
      console.log(answers);
      const allCorrect = answers.every(
        (answer) => answer === "in correct spot"
      );
      if (allCorrect) {
        setConfetti(true);
      } else {
        setConfetti(false);
      }
      let tempScore = 0;
      answers.forEach((answer, index) => {
        if (answer === "in correct spot") {
          tempScore += 100 * (6 - index) * (7 - Math.floor(counter / 6));
        } else if (answer === "correct letter") {
          tempScore += 30 * (6 - index) * (7 - Math.floor(counter / 6));
        }
      });
      setScore((prevScore) => prevScore + tempScore);
    }
  }, [answers]);
  const handleKeyDown = (e) => {
    if (e.key.length === 1 && /^[a-zA-Z]$/i.test(e.key) && letters.length < 5) {
      setLetters((prevLetters) => [...prevLetters, e.key.toLowerCase()]);
      setCounter((prevCounter) => prevCounter + 1);
      console.log(confetti);
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
      setCellWord((prevCellWord) => [
        ...prevCellWord,
        letters.map((letter, index) => ({
          letter: letter,
          answer: answers[index],
        })),
      ]);
      if (counter < 30) {
        setLetters([]);
      } else {
        if (!confetti) {
          setLost(true);
        }
      }
    }
  };

  useEffect(() => {
    console.log(word);
  }, [word]);

  useEffect(() => {
    if (!confetti) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [letters, confetti]);

  useEffect(() => {
    setWord(generate({ minLength: 5, maxLength: 5 }).split(""));
  }, []);

  return (
    <>
      {confetti && <ReactConfetti width={width} height={height} />}
      <Container>
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <Row
            key={row}
            row={row}
            letters={letters}
            answers={answers}
            turn={Math.floor((counter - 1) / 5) === row}
            done={done[row]}
            cellWord={cellWord[row]}
          />
        ))}
        {lost && (
          <Button
            variant="success"
            className="mt-2"
            onClick={() => {
              setLetters([]);
              setCounter(0);
              setAnswers([]);
              setCellWord([]);
              setWord(generate({ minLength: 5, maxLength: 5 }).split(""));
              setDone([]);
              setConfetti(false);
              setLost(false);
            }}
          >
            Try again
          </Button>
        )}
      </Container>
    </>
  );
};

export default Grid;
