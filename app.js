const finalResult = document.querySelector('.final-result');
const roundResult = document.querySelector('.round-result');
const statBoxes = document.querySelectorAll('.stat');
const roundCount = document.querySelector('.round-count');
const drawCount = document.querySelector('.draws');
const winCount = document.querySelector('.wins');
const looseCount = document.querySelector('.looses');
const selections = document.querySelectorAll('.selection');
const newGame = document.querySelector('.start');

let roundCounter = 0;
let drawCounter = 0;
let winCounter = 0;
let looseCounter = 0;

function endGame(result) {
  finalResult.innerHTML = result === true ? 'You won the game!' : 'You loose the game :(';
  finalResult.classList.add(result === true ? 'win' : 'loose');

  statBoxes.forEach((box) => {
    box.classList.add(result === true ? 'win-bg' : 'loose-bg');
  });

  selections.forEach((selection) => {
    selection.classList.add('end-game');
    selection.setAttribute('disabled', '');
  });
}

function oponent() {
  const oponentChoice = document.querySelector('.oponent-choice');

  const moves = ['rock', 'paper', 'scissors'];
  const oponentMove = moves[Math.floor(Math.random() * moves.length)];

  oponentChoice.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace', 'fa-hand-rock');
  oponentChoice.classList.add('rotate-315', `fa-hand-${oponentMove === 'scissors' ? 'peace' : oponentMove}`);

  return oponentMove;
}

function checkWinner(playerSelection, oponentSelection) {
  let result;

  switch (true) {
    case playerSelection === oponentSelection:
      result = 'draw';
      break;
    case playerSelection === 'rock' && oponentSelection === 'paper':
    case playerSelection === 'paper' && oponentSelection === 'scissors':
    case playerSelection === 'scissors' && oponentSelection === 'rock':
      result = 'loose';
      break;
    default:
      result = 'win';
      break;
  }

  return [result, playerSelection, oponentSelection];
}

function playRound(playerMove) {
  const playerChoice = document.querySelector('.player-choice');
  const oponentChoice = document.querySelector('.oponent-choice');

  let roundInfo = [];

  roundInfo = checkWinner(playerMove, oponent());

  playerChoice.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace', 'fa-hand-rock');
  playerChoice.classList.add('rotate-45', `fa-hand-${playerMove === 'scissors' ? 'peace' : playerMove}`);

  roundCounter += 1;
  roundCount.innerHTML = roundCounter;

  if (roundInfo[0] === 'win') {
    winCounter += 1;
    roundResult.innerHTML = `${roundInfo[1]} beats ${roundInfo[2]}`;
    winCount.innerHTML = winCounter;
    roundResult.classList.remove('loose-bg');
    playerChoice.classList.remove('loose');
    oponentChoice.classList.remove('win');
    roundResult.classList.add('win-bg');
    playerChoice.classList.add('win');
    oponentChoice.classList.add('loose');
  } else if (roundInfo[0] === 'loose') {
    looseCounter += 1;
    roundResult.innerHTML = `${roundInfo[2]} beats ${roundInfo[1]}`;
    looseCount.innerHTML = looseCounter;
    roundResult.classList.remove('win-bg');
    playerChoice.classList.remove('win');
    oponentChoice.classList.remove('loose');
    roundResult.classList.add('loose-bg');
    playerChoice.classList.add('loose');
    oponentChoice.classList.add('win');
  } else if (roundInfo[0] === 'draw') {
    drawCounter += 1;
    roundResult.innerHTML = 'Draw';
    drawCount.innerHTML = drawCounter;
    roundResult.classList.remove('win-bg', 'loose-bg');
    playerChoice.classList.remove('win', 'loose');
    oponentChoice.classList.remove('win', 'loose');
  }

  if (roundCounter > 0) {
    newGame.style.display = 'inline';
    roundResult.style.display = 'inline';
  }

  if (winCounter === 5) {
    endGame(true);
  } else if (looseCounter === 5) {
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
  const oponentChoice = document.querySelector('.oponent-choice');

  roundCounter = 0;
  winCounter = 0;
  drawCounter = 0;
  looseCounter = 0;

  statBoxes.forEach((box) => {
    box.classList.remove('win-bg', 'loose-bg');
  });

  selections.forEach((selection) => {
    selection.classList.remove('end-game');
    selection.removeAttribute('disabled');
  });

  oponentChoice.classList.remove('rotate-315', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  oponentChoice.classList.remove('win', 'loose');
  playerChoice.classList.remove('rotate-45', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  playerChoice.classList.remove('win', 'loose');
  finalResult.classList.remove('loose', 'win');
  roundResult.classList.remove('win', 'draw', 'loose');
  oponentChoice.classList.add('fa-question-circle');
  playerChoice.classList.add('fa-question-circle');
  finalResult.innerHTML = 'Good luck';
  roundResult.innerHTML = '';
  roundCount.innerHTML = '0';
  drawCount.innerHTML = '0';
  winCount.innerHTML = '0';
  looseCount.innerHTML = '0';
  roundResult.style.display = 'none';
  newGame.style.display = 'none';
}

startGame();

newGame.addEventListener('click', () => {
  reset();
});
