let currentPlayer = 0;

let players = [];

let positionUsed = [];
let moves = [];

let playerWinner = "";

let positionWinner = [];

function createPlayers() {
  let player1Name = prompt("Qual o nome do jogador 1?");
  let player1Symbol = prompt("Qual caracter deseja utilizar?");
  players.push({ id: 0, name: player1Name, symbol: player1Symbol });

  let player2Name = prompt("Qual o nome do jogador 2?");
  let player2Symbol = prompt("Qual caracter deseja utilizar?");
  players.push({ id: 1, name: player2Name, symbol: player2Symbol });

  if (!validatePlayers()) return;

  alert("O " + players[0].name + " começa a partida");
}

function validatePlayers() {
  if (!players[0].name) {
    alert("O nome do jogador 1 não foi preenchido!");
    return false;
  }
  if (!players[0].symbol) {
    alert("O símbolo do jogador 1 não foi preenchido!");
    return false;
  }

  if (!players[1].name) {
    alert("O nome do jogador 2 não foi preenchido!");
    return false;
  }
  if (!players[1].symbol) {
    alert("O símbolo do jogador 2 não foi preenchido!");
    return false;
  }

  return true;
}

function checkWinner() {
  const winnersPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let mov of winnersPositions) {
    let pos1 = moves[mov[0]];
    let pos2 = moves[mov[1]];
    let pos3 = moves[mov[2]];
    if (pos1 !== undefined && pos1 === pos2 && pos2 === pos3) {
      positionWinner = mov;
      console.log(positionWinner);
      if (currentPlayer === 1) {
        playerWinner = players[1].name;
      } else {
        playerWinner = players[0].name;
      }
      setPositionsWinnerBoard();
      alert("O " + playerWinner + " ganhou a partida!");
      return;
    }
  }
}

function setPositionsWinnerBoard() {
  const pos1 = document.getElementById("pos-" + positionWinner[0]);
  const pos2 = document.getElementById("pos-" + positionWinner[1]);
  const pos3 = document.getElementById("pos-" + positionWinner[2]);

  pos1.style.backgroundColor = "#00ff32";
  pos2.style.backgroundColor = "#00ff32";
  pos3.style.backgroundColor = "#00ff32";
}

function setMove(pos) {
  let positionNumber = pos[pos.length - 1];
  moves[positionNumber] = currentPlayer;
}

function resetGame() {
  currentPlayer = 0;
  positionUsed = [];
  moves = [];
  playerWinner = "";
  positionWinner = [];

  document.querySelectorAll(".position").forEach((el) => {
    el.innerText = "";
    el.style.backgroundColor = "white";
  });
}

function handlePLayer(el) {
  let position = document.getElementById(el);

  if (players.length < 2) {
    alert("Crie os jogadores para começar a partida!");
    return;
  }

  if (!validatePlayers()) {
    alert(
      "Os jogadores não foram criados corretamente, crie novamnete os jogadores para começar!"
    );
    return;
  }

  if (playerWinner) {
    alert(
      "Nessa partida já temos um ganhador, reinicie a partida para continuar jogando!"
    );
    return;
  }

  if (positionUsed.includes(el)) {
    alert("Jogada inválida!");
    return;
  }
  positionUsed.push(el);

  setMove(el);
  checkWinner();

  if (currentPlayer == 1) {
    position.innerText = players[1].symbol;
    currentPlayer = 0;
  } else {
    position.innerText = players[0].symbol;
    currentPlayer = 1;
  }
}

document.querySelectorAll(".position").forEach((position) => {
  position.addEventListener("click", (event) => {
    event.preventDefault();

    handlePLayer(event.target.id);
  });
});
