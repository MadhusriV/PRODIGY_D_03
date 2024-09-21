const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const createBoard = () => {
    boardState.forEach((_, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', index);
        square.addEventListener('click', handleClick);
        board.appendChild(square);
    });
};

const handleClick = (event) => {
    const index = event.target.getAttribute('data-index');

    if (boardState[index] !== '' || !isGameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkResult();
};

const checkResult = () => {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.innerText = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    Array.from(board.children).forEach(square => {
        square.innerText = '';
    });
};

resetButton.addEventListener('click', resetGame);
createBoard();
statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
