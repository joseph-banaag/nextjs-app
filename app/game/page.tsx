"use client";
import React from "react";
import { useState } from "react";

function Square({ value, onSquareClick }: { value: any; onSquareClick: any }) {
  return (
    <button className="square" type="button" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function GamePage({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: any;
  squares: any;
  onPlay: any;
}) {
  function handleClick(i: any) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function calculateWinner(squares: any) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <section>
        <section>
          <h1
            id="status"
            className="text-center items-center m-5 border-2 border-gray-800 rounded-full py-1 px-8 text-slate-400"
          >
            {status}
          </h1>
        </section>

        <section className="text-center items-center m-5  py-1 px-8">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </section>
        <section className="text-center items-center m-5  py-1 px-8">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </section>
        <section className="text-center items-center m-5  py-1 px-8">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </section>
      </section>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move} id="move">
        <button
          type="button"
          onClick={() => jumpTo(move)}
          className="text-center items-center m-px"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <section className="flex flex-row">
        <section className="m-4">
          <GamePage
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </section>

        <section className="text-center items-center">
          <ol>{moves}</ol>
        </section>
      </section>
    </>
  );
}
