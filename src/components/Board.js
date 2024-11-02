import Square from "../components/Square";

function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  );
}

export default Board;
