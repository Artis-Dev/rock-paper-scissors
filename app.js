const finalResult = document.querySelector('.final-result');
const roundResult = document.querySelector('.round-result');
const statBoxes = document.querySelectorAll('.stat');
const roundCount = document.querySelector('.round-count');
const drawCount = document.querySelector('.draws');
const winCount = document.querySelector('.wins');
const defeatCount = document.querySelector('.defeats');
const selections = document.querySelectorAll('.selection');
const newGame = document.querySelector('.new-game');

let roundCounter = 0;
let drawCounter = 0;
let winCounter = 0;
let defeatCounter = 0;

function endGame(result) {
  finalResult.innerHTML = result === true ? 'You won the game!' : 'You lose the game :(';
  finalResult.classList.add(result === true ? 'win' : 'lose');

  statBoxes.forEach((box) => {
    box.classList.add(result === true ? 'win-bg' : 'lose-bg');
  });

  selections.forEach((selection) => {
    selection.classList.add('end-game');
    selection.setAttribute('disabled', '');
  });
}

function opponent() {
  const opponentChoice = document.querySelector('.opponent-choice');

  const moves = ['rock', 'paper', 'scissors'];
  const opponentMove = moves[Math.floor(Math.random() * moves.length)];

  opponentChoice.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace', 'fa-hand-rock');
  opponentChoice.classList.add('rotate-315', `fa-hand-${opponentMove === 'scissors' ? 'peace' : opponentMove}`);

  return opponentMove;
}

function checkWinner(playerSelection, opponentSelection) {
  let result;

  switch (true) {
    case playerSelection === opponentSelection:
      result = 'draw';
      break;
    case playerSelection === 'rock' && opponentSelection === 'paper':
    case playerSelection === 'paper' && opponentSelection === 'scissors':
    case playerSelection === 'scissors' && opponentSelection === 'rock':
      result = 'lose';
      break;
    default:
      result = 'win';
      break;
  }

  return [result, playerSelection, opponentSelection];
}

function playRound(playerMove) {
  const playerChoice = document.querySelector('.player-choice');
  const opponentChoice = document.querySelector('.opponent-choice');

  let roundInfo = [];

  roundInfo = checkWinner(playerMove, opponent());

  playerChoice.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace', 'fa-hand-rock');
  playerChoice.classList.add('rotate-45', `fa-hand-${playerMove === 'scissors' ? 'peace' : playerMove}`);

  roundCounter += 1;
  roundCount.innerHTML = roundCounter;

  if (roundInfo[0] === 'win') {
    winCounter += 1;
    roundResult.innerHTML = `${roundInfo[1]} beats ${roundInfo[2]}`;
    winCount.innerHTML = winCounter;
    roundResult.classList.remove('lose-bg');
    playerChoice.classList.remove('lose');
    opponentChoice.classList.remove('win');
    roundResult.classList.add('win-bg');
    playerChoice.classList.add('win');
    opponentChoice.classList.add('lose');
  } else if (roundInfo[0] === 'lose') {
    defeatCounter += 1;
    roundResult.innerHTML = `${roundInfo[2]} beats ${roundInfo[1]}`;
    defeatCount.innerHTML = defeatCounter;
    roundResult.classList.remove('win-bg');
    playerChoice.classList.remove('win');
    opponentChoice.classList.remove('lose');
    roundResult.classList.add('lose-bg');
    playerChoice.classList.add('lose');
    opponentChoice.classList.add('win');
  } else if (roundInfo[0] === 'draw') {
    drawCounter += 1;
    roundResult.innerHTML = 'Draw';
    drawCount.innerHTML = drawCounter;
    roundResult.classList.remove('win-bg', 'lose-bg');
    playerChoice.classList.remove('win', 'lose');
    opponentChoice.classList.remove('win', 'lose');
  }

  if (roundCounter > 0) {
    newGame.style.display = 'inline';
    roundResult.style.display = 'inline';
  }

  if (winCounter === 5) {
    endGame(true);
  } else if (defeatCounter === 5) {
    endGame(false);
  }
}

function startGame() {
  selections.forEach((selection) => {
    selection.addEventListener('click', () => {
      if (selection.classList.contains('rock')) {
        playRound('rock');
      } else if (selection.classList.contains('paper')) {
        playRound('paper');
      } else {
        playRound('scissors');
      }
    });
  });
}

function reset() {
  const playerChoice = document.querySelector('.player-choice');
  const opponentChoice = document.querySelector('.opponent-choice');

  roundCounter = 0;
  winCounter = 0;
  drawCounter = 0;
  defeatCounter = 0;

  statBoxes.forEach((box) => {
    box.classList.remove('win-bg', 'lose-bg');
  });

  selections.forEach((selection) => {
    selection.classList.remove('end-game');
    selection.removeAttribute('disabled');
  });

  opponentChoice.classList.remove('rotate-315', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  opponentChoice.classList.remove('win', 'lose');
  playerChoice.classList.remove('rotate-45', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  playerChoice.classList.remove('win', 'lose');
  finalResult.classList.remove('lose', 'win');
  roundResult.classList.remove('win', 'draw', 'lose');
  opponentChoice.classList.add('fa-question-circle');
  playerChoice.classList.add('fa-question-circle');
  finalResult.innerHTML = 'Good luck';
  roundResult.innerHTML = '';
  roundCount.innerHTML = '0';
  drawCount.innerHTML = '0';
  winCount.innerHTML = '0';
  defeatCount.innerHTML = '0';
  roundResult.style.display = 'none';
  newGame.style.display = 'none';
}

startGame();

newGame.addEventListener('click', () => {
  reset();
});
