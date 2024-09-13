// selecting game elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// winning conditions
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

// game state
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

// initialize the game
initializeGame();

// function to initialize the game
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    updateStatusText();
}

// function called when a cell is clicked
function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));

    if (!running || options[cellIndex] !== "") {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    changePlayer();
    updateStatusText();
}

// function to update a cell
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// function to change the player
function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// function to check for a winner
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
        statusText.textContent = "DRAW!";
        running = false;
        breakGame();
    }
}
// function to announce the winner
function announceWinner() {
    statusText.textContent = `${currentPlayer} WINS!`;
    running = false;
    breakGame();
}

// function to restart the game
function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    updateStatusText();
}

// function to update the status text
function updateStatusText() {
    statusText.textContent = `${currentPlayer}'S TURN`;
}