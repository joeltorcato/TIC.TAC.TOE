const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    updateStatusText();
}

function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));

    if (!running || options[cellIndex] !== "") {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    changePlayer();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusText();
}

function checkWinner() {
    let roundWon = false;

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        const cellA = options[a];
        const cellB = options[b];
        const cellC = options[c];

        if (cellA === currentPlayer && cellB === currentPlayer && cellC === currentPlayer) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner();
    } else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    }
}

function announceWinner() {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    updateStatusText();
}

function updateStatusText() {
    statusText.textContent = `${currentPlayer}'s turn`;
}