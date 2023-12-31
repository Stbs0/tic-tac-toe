const Game = (() => {
  const GameBoard = (function () {
    const board = [];
    const rows = 3;
    const column = 3;

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < column; j++) {
        board[i][j] = null;
      }
    }
    const printBoard = () => console.log(board);
    const getBoard = () => board;
    return { board, getBoard, printBoard };
  })();

  const Player = (function (name, marker) {
    const player1 = { name: "you", marker: "O" };
    const player2 = { name: "CP", marker: "X" };
    return { player1, player2 };
  })();
  function Dom() {
    const blocks = document.querySelectorAll(".block");
  }
  function playRound() {
    let activePlayer = Player.player1;
    const play = (row, column) => {
      if (GameBoard.board[row][column] === null) {
        GameBoard.board[row][column] = activePlayer.marker;
      } else {
        console.log("The position is taken");
      }

      GameBoard.printBoard();
      switchPlayerTurn();
    };

    const switchPlayerTurn = () => {
      if (activePlayer === Player.player1) {
        activePlayer = Player.player2;
      } else {
        activePlayer = Player.player1;
      }
    };
    return { play };
  }

  function winCheck() {
    for (let i = 0; i < GameBoard.board.length; i++) {
      if (
        GameBoard.board[i].every((cell) => cell === row[0] && cell !== null)
      ) {
        console.log(`Player ${row[0]} wins!`);
      }
    }
  }
  return { playRound };
})();
Game.playRound().play(1, 2);
