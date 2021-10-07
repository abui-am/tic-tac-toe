let turn = 'o';
let numSquares = 0;
let boardSize = 0;
let cellElements = '';

const board = document.getElementById('board');
const messageRoot = document.querySelector('[data-message]');
const messageStart = document.querySelector('[data-message-start]');
const message = document.querySelector('[data-message-text]');
const boardSizeInput = document.getElementById('boardSizeInput');
const turnMessage = document.getElementById('turn-message');

const startGame = () => {
  turn = 'o';
  turnMessage.innerHTML = `${turn}'s turn`;
  board.innerHTML = '';
  boardSize = parseInt(boardSizeInput.value);
  numSquares = boardSize * boardSize;

  for (let i = 0; i < boardSize * boardSize; i++) {
    board.innerHTML += '<div  class="cell" data-cell></div>';
  }

  cellElements = document.querySelectorAll('[data-cell]');
  cellElements.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true });
  });

  board.style.gridTemplateColumns = `repeat(${boardSize}, auto)`;
  messageStart.classList.remove('show');
  setRootHoverClass();
};

const showStartMessage = () => {
  messageRoot.classList.remove('show');
  messageStart.classList.add('show');
};

const handleClick = (e) => {
  const cell = e.target;
  placeMark(cell, turn);
  if (checkWin(turn)) {
    endGame({ isDraw: false });
  } else if (isDraw()) {
    endGame({ isDraw: true });
  } else {
    swapTurn();
    setRootHoverClass();
  }
};

const placeMark = (cell, turn) => {
  cell.classList.add(turn);
  cell.innerHTML = turn;
};

const swapTurn = () => {
  if (turn === 'x') {
    turn = 'o';
  } else {
    turn = 'x';
  }
  turnMessage.innerHTML = `${turn}'s turn'`;
};

const setRootHoverClass = () => {
  // Reset turn
  board.classList.remove('x');
  board.classList.remove('o');

  // start
  board.classList.add(turn);
};

const checkWin = () => {
  // Check for win by row
  for (i = 0; i < numSquares; i += 1) {
    // iterate over entire board
    if (i % boardSize == 0) {
      let rowCheck = [];
      for (let squareNum = i; squareNum < i + boardSize; squareNum += 1) {
        // iteration over column 1
        console.log(cellElements[squareNum]);
        rowCheck.push(cellElements[squareNum].innerHTML);
      }
      // console.log('Row ' + i + ' is ' + rowCheck);
      // console.log(allSame(rowCheck));
      if (allSame(rowCheck)) {
        return true;
      }
    }
  }
  // Check for win by column
  for (i = 0; i < numSquares; i += 1) {
    // iterate over entire board
    if (i < boardSize) {
      let colCheck = [];
      for (let squareNum = i; squareNum < numSquares; squareNum += boardSize) {
        colCheck.push(cellElements[squareNum].innerHTML);
      }
      // console.log('Column ' + i + 'is ' + colCheck);
      // console.log(allSame(colCheck));

      if (allSame(colCheck)) {
        winningPlayer = colCheck; // Push winning player data
        return true;
      }
    }
  }

  let diag1Check = [];

  // Check \
  for (i = 0; i < numSquares; i += 1) {
    // first iteration over board
    if (i % (boardSize + 1) == 0) {
      // use condition if iterator % BOARDSIZE + 1 === 0 to get left diagonals
      // console.log(i);
      diag1Check.push(cellElements[i].innerHTML);
    }
  }

  if (allSame(diag1Check)) {
    return true;
  }

  let diag2Check = [];
  // Check /
  for (i = boardSize - 1; i < numSquares - 1; i += 1) {
    // first iteration over board
    if (i % (boardSize - 1) == 0) {
      // use condition if iterator % BOARDSIZE - 1 === 0 to get right diagonals
      // console.log(i);
      diag2Check.push(cellElements[i].innerHTML);
    }
  }

  if (allSame(diag2Check)) {
    return true;
  }

  return false;
};

const endGame = ({ isDraw }) => {
  isDraw
    ? (message.innerHTML = 'draw')
    : (message.innerHTML = `${turn}'s' wins`);

  messageRoot.classList.add('show');
};

const isDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
};

function allSame(array) {
  let first = array[0];

  if (array[0] === '') {
    return false;
  } else {
    return array.every((element) => {
      return element === first;
    });
  }
}

document.getElementById('startBtn').addEventListener('click', startGame);
document
  .getElementById('restartBtn')
  .addEventListener('click', showStartMessage);
