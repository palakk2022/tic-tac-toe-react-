
import '../Style/Square.css';
function Square({ value, onSquareClick, isWinning }) {
    return (
        <button
            className={`square ${isWinning ? 'winning' : ''}`}
            onClick={onSquareClick}
            disabled={value !== null}
        >
            <span className={`square-value ${value === 'X' ? 'x-player' : value === 'O' ? 'o-player' : ''}`}>
                {value}
            </span>
        </button>
    );
}

export default Square;