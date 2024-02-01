const Game = (() => {
  let gamePlayed = 0;

  const GameBoard = (function () {
    const gameBoard = [];
    const rows = 3;
    const column = 3;

    for (let i = 0; i < rows; i++) {
      gameBoard.push([]);
      for (let j = 0; j < column; j++) {
        gameBoard[i].push(null);
      }
    }
    const printGameBoard = () => console.log(gameBoard.slice());

    return { gameBoard, printGameBoard };
  })();

  const Player = (function () {
    const player1 = { name: "player", marker: "O" };
    const player2 = { name: "computer", marker: "X" };
    return { player1, player2 };
  })();
  let activePlayer = Player.player1;
  function PlayerTurn(row, column) {
    activePlayer = Player.player1;
    if (GameBoard.gameBoard[row][column] !== null) {
      return "The position is taken";
    }
    if (GameBoard.gameBoard[row][column] == null) {
      GameBoard.gameBoard[row][column] = activePlayer.marker;
    }
    return;
  }
  const playRound = (row, column) => {
    let msg;
    PlayerTurn(row, column);
    msg = winCheck();

    switchPlayerTurn();

    if (
      GameBoard.gameBoard.every((row) => {
        return row.every((cell) => {
          return cell === null;
        });
      })
    ) {
      return;
    }

    computerChoice();
    msg = winCheck();

    gamePlayed++;
    return msg;
  };
  function switchPlayerTurn() {
    return activePlayer === Player.player1
      ? (activePlayer = Player.player2)
      : (activePlayer = Player.player1);
  }

  function computerChoice() {
    for (let i = 0; i < 10; i++) {
      let row = Math.floor(Math.random() * 3);

      let column = Math.floor(Math.random() * 3);

      if (GameBoard.gameBoard[row][column] !== null) {
        continue;
      } else {
        GameBoard.gameBoard[row][column] = Player.player2.marker;
        break;
      }
    }
  }

  function winCheck() {
    let msg = null;
    function checkTie() {
      if (gamePlayed === 4) {
        console.log("its a tie");
        gamePlayed = 0;
        // GameBoard.gameBoard.forEach((element) => {
        //   element.fill(null);
        // });
        return "it's a tie";
      }
    }
    function checkMarker() {
      if (
        (GameBoard.gameBoard[0][0] === activePlayer.marker &&
          GameBoard.gameBoard[1][0] === activePlayer.marker &&
          GameBoard.gameBoard[2][0] === activePlayer.marker) ||
        (GameBoard.gameBoard[0][1] === activePlayer.marker &&
          GameBoard.gameBoard[1][1] === activePlayer.marker &&
          GameBoard.gameBoard[2][1] === activePlayer.marker) ||
        (GameBoard.gameBoard[0][2] === activePlayer.marker &&
          GameBoard.gameBoard[1][2] === activePlayer.marker &&
          GameBoard.gameBoard[2][2] === activePlayer.marker) ||
        (GameBoard.gameBoard[0][0] === activePlayer.marker &&
          GameBoard.gameBoard[0][1] === activePlayer.marker &&
          GameBoard.gameBoard[0][2] === activePlayer.marker) ||
        (GameBoard.gameBoard[1][0] === activePlayer.marker &&
          GameBoard.gameBoard[1][1] === activePlayer.marker &&
          GameBoard.gameBoard[1][2] === activePlayer.marker) ||
        (GameBoard.gameBoard[2][0] === activePlayer.marker &&
          GameBoard.gameBoard[2][1] === activePlayer.marker &&
          GameBoard.gameBoard[2][2] === activePlayer.marker) ||
        (GameBoard.gameBoard[0][0] === activePlayer.marker &&
          GameBoard.gameBoard[1][1] === activePlayer.marker &&
          GameBoard.gameBoard[2][2] === activePlayer.marker) ||
        (GameBoard.gameBoard[0][2] === activePlayer.marker &&
          GameBoard.gameBoard[1][1] === activePlayer.marker &&
          GameBoard.gameBoard[2][0] === activePlayer.marker)
      ) {
        if (activePlayer.marker === "X") {
          msg = "Computer";
        } else if (activePlayer.marker === "O") {
          msg = "player";
        }
        gamePlayed = 0;
        // GameBoard.gameBoard.forEach((element) => {
        //   element.fill(null);
        // });
        return msg;
      }
    }
    checkTie();
    checkMarker();
    return msg;
  }

  return {
    winCheck,
    activePlayer,
    playRound,
    computerChoice,
    switchPlayerTurn,
    PlayerTurn,
    GameBoard,
  };
})();

function renderGame() {
  const btns = document.querySelectorAll(".block");
  const winner = document.querySelector(".winner");
  let column, row;
  let winner_;
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      column = btn.dataset.column;
      row = btn.dataset.row;
      // Game.PlayerTurn(row, column);
      winner_ = Game.playRound(row, column);
      console.log(Game.GameBoard.gameBoard);

      // winner.textContent = Game.winCheck();
      // Game.switchPlayerTurn();
      // Game.computerChoice();
      btns.forEach((btn) => {
        btn.textContent =
          Game.GameBoard.gameBoard[btn.dataset.row][btn.dataset.column];
      });
      winner.textContent = winner_;
    });
  });
}
renderGame();
