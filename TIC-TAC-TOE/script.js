const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the board
function init() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    render();
    status.innerHTML = `Player ${currentPlayer}'s turn`;
}

// Render the board
function render() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellDiv);
    });
}

// Handle cell click
function handleCellClick(index) {
    if (boardState[index] === '' && !checkWinner()) {
        boardState[index] = currentPlayer;
        render();
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerHTML = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for a winner
function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            status.innerHTML = `Player ${currentPlayer} wins!`;
            return true;
        }
    }
    if (boardState.every(cell => cell !== '')) {
        status.innerHTML = "It's a draw!";
        return true;
    }
    return false;
}

// Restart the game
restartBtn.addEventListener('click', init);

// Initialize the game
init();
