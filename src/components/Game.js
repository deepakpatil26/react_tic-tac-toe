import React, { useState, useEffect } from "react";
import Board from "../components/Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Tracks whose turn it is
  const [mode, setMode] = useState("HUMAN_HUMAN"); // Tracks game mode
  const [humanStarts, setHumanStarts] = useState(true); // Random first player flag

  // Randomly assign first player (either X or O) at game start or reset
  useEffect(() => {
    const randomStart = Math.random() < 0.5;
    setIsXNext(randomStart); // Randomly set whether X goes first
    setHumanStarts(randomStart);

    // For Human vs AI mode, let AI make the first move if it's AI's turn
    if (mode === "HUMAN_AI" && !randomStart) {
      const aiMove = calculateBestMove(squares, "O");
      setTimeout(() => handleClick(aiMove, false), 500); // AI moves first if chosen
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "HUMAN_AI" && !isXNext && !calculateWinner(squares)) {
      const aiMove = calculateBestMove(squares, "O");
      if (aiMove !== null) {
        setTimeout(() => handleClick(aiMove, false), 500); // Small delay for AI move
      }
    }
  }, [squares, isXNext, mode]);

  function handleClick(i, isPlayer = true) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isPlayer ? (isXNext ? "X" : "O") : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function handleModeChange(selectedMode) {
    setMode(selectedMode);
    resetGame();
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  return (
    <div className="game">
      <div>
        <button onClick={() => handleModeChange("HUMAN_HUMAN")}>
          Human vs Human
        </button>
        <button onClick={() => handleModeChange("HUMAN_AI")}>
          Human vs AI
        </button>
      </div>
      <Board squares={squares} onSquareClick={(i) => handleClick(i)} />
      <button onClick={resetGame}>Restart Game</button>
      <div className="status">
        {calculateWinner(squares)
          ? `Winner: ${calculateWinner(squares)}`
          : isDraw
          ? "It's a Draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
    </div>
  );
}

// Minimax function for challenging AI
function calculateBestMove(squares, player) {
  const opponent = player === "X" ? "O" : "X";

  function evaluate(squares) {
    const winner = calculateWinner(squares);
    if (winner === player) return 1;
    if (winner === opponent) return -1;
    return 0;
  }

  function minimax(squares, depth, isMaximizing) {
    const score = evaluate(squares);
    if (score === 1 || score === -1) return score;
    if (!squares.includes(null)) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = player;
          best = Math.max(best, minimax(squares, depth + 1, false));
          squares[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = opponent;
          best = Math.min(best, minimax(squares, depth + 1, true));
          squares[i] = null;
        }
      }
      return best;
    }
  }

  let bestMove = null;
  let bestValue = -Infinity;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      squares[i] = player;
      const moveValue = minimax(squares, 0, false);
      squares[i] = null;
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
