const board = document.getElementById('board');
const statusText = document.getElementById('status');
const mainScreen = document.getElementById('mainScreen');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    showResultScreen(`🎉 Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (!gameState.includes("")) {
    showResultScreen("🤝 It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningConditions.some(combination => {
    const [a, b, c] = combination;
    return (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    );
  });
}

function showResultScreen(message) {
  resultText.textContent = message;
  mainScreen.style.display = 'none';
  resultScreen.style.display = 'flex';
}

function startNewGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  mainScreen.style.display = 'block';
  resultScreen.style.display = 'none';
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.setAttribute("data-index", index);
    cellElement.textContent = cell;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

// Initial render
renderBoard();