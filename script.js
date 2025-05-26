const Gameboard = (() => {
  const board = Array(9).fill("");

  // returns the board array copy
  const getBoard = () => [...board];
  const placeMark = (index, mark) => {
    if (index < board.length && board[index] === "") {
      board[index] = mark;
      return true;
    } else return false;
  };

  const reset = () => {
    // to make the board array empty
    board.fill("");
  };

  return {
    getBoard,
    placeMark,
    reset,
  };
})();

// for creating users
const createUser = (playerName, mark) => {
  return {
    playerName,
    mark,
  };
};

const game = (() => {
  let gameOver = false;
  let players = [];
  let playerActive;
  const winningPatterns = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  let initialization = (playerX, playerO) => {
    players = [createUser(playerX, "X"), createUser(playerO, "O")];
    playerActive = players[0];
    gameOver = false;
  };

  let switchTurn = () => {
    if (playerActive === players[0]) playerActive = players[1];
    else playerActive = players[0];
  };

  let gameRound = (index) => {
    if (!Gameboard.placeMark(index, playerActive.mark)) {
      console.log("Spot taken!");
      return;
    }
    // declare winner or tie
    if (checkWin()) {
      gameOver = true;
      console.log("The game ends - WINNER");
    } else if (checkTie()) {
      gameOver = true;
      console.log("The game ends - TIE");
    } else {
      switchTurn();
    }
  };

  const checkWin = () => {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      const currentBoard = Gameboard.getBoard();
      if (
        currentBoard[a] !== "" &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const checkTie = () => {
    const currentBoard = Gameboard.getBoard();

    // if there is a winner
    if (checkWin()) return false;

    const boardFull = currentBoard.every((cell) => cell !== "");
    return boardFull;
  };

  return {
    initialization,
    switchTurn,
    gameRound,
    checkWin,
    checkTie,
    getActivePlayer: () => playerActive,
  };
})();

const displayController = (() => {
  const displayBoard = document.querySelector('.board');
  const resetBtn = document.querySelector('#restartBtn');
  const gameResults = document.querySelector('#results');
  const cellArray = [];
  const playerXInput = document.querySelector('#player1Name');
  const playerOInput = document.querySelector('#player2Name');
  const startBtn = document.querySelector('#startBtn');
  const boardCells = Gameboard.getBoard();

  for (let i = 0; i < boardCells.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = boardCells[i];
    cell.addEventListener('click', () => {
      if (!game.gameOver) {
        game.gameRound(i);
        cell.textContent = Gameboard.getBoard()[i];
        console.log('Clicked');
        if(game.checkWin()) gameResults.textContent = `${game.getActivePlayer().playerName} wins!`;
        else if(game.checkTie()) gameResults.textContent = "It's a tie!";
      }
    });
    cellArray.push(cell);
    displayBoard.appendChild(cell);
  }

  startBtn.addEventListener('click', () => {
    const playerX = playerXInput.value || "Player 1";
    const playerO = playerOInput.value || "Player 2";
    
    game.initialization(playerX, playerO);
    Gameboard.reset();
    cellArray.forEach((cell, index) => {
      cell.textContent = Gameboard.getBoard()[index];
    });
  });

  resetBtn.addEventListener('click', () => {
    Gameboard.reset();
  });
})();
