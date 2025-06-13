import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (i: number) => void;
}

function Board({ squares, onSquareClick }: BoardProps) {
  return (
    <div className='board'>
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onSquareClick(i)}
        />
      ))}
    </div>
  );
}

export default Board;
