const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn = 'x';

const board = document.getElementById('board');
const messageRoot = document.querySelector('[data-message]');
const message = document.querySelector('[data-message-text]');
const cellElements = document.querySelectorAll('[data-cell]');
const button = document.getElementById('restartBtn');

const startGame = () => {
  turn = 'o';
  cellElements.forEach((cell) => {
    // Reset
    cell.classList.remove('o');
    cell.classList.remove('x');
    cell.removeEventListener('click', handleClick);

    //Add
    cell.addEventListener('click', handleClick, { once: true });
  });
  button.addEventListener('click', startGame);
  messageRoot.classList.remove('show');
  setRootHoverClass();
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = turn === 'x' ? 'x' : 'o';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame({ isDraw: false });
  } else if (isDraw()) {
    endGame({ isDraw: true });
  } else {
    swapTurn();
    setRootHoverClass();
  }
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const swapTurn = () => {
  if (turn === 'x') {
    turn = 'o';
  } else {
    turn = 'x';
  }
};

const setRootHoverClass = () => {
  // Reset turn
  board.classList.remove('x');
  board.classList.remove('o');

  // start
  board.classList.add(turn);
};

const checkWin = (currClass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currClass);
    });
  });
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

startGame();
