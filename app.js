const selections = document.querySelectorAll('.selection');
const finalResult = document.querySelector('.final-result');
const roundResult = document.querySelector('.round-result');
const roundCount = document.querySelector('.round-count');
const tieScore = document.querySelector('.ties');
const winScore = document.querySelector('.wins');
const looseScore = document.querySelector('.looses');
const newGame = document.querySelector('.start');

let roundCounter = 0;
let tieCounter = 0;
let winCounter = 0;
let looseCounter = 0;

function checkWinner(pcSelection, npcSelection) {
  let result;

  switch (true) {
    case pcSelection === npcSelection:
      result = 'tie';
      break;
    case pcSelection === 'rock' && npcSelection === 'paper':
    case pcSelection === 'paper' && npcSelection === 'scissors':
    case pcSelection === 'scissors' && npcSelection === 'rock':
      result = 'loose';
      break;
    default:
      result = 'win';
      break;
  }

  return [result, pcSelection, npcSelection];
}

function oponent() {
  const npcIcon = document.querySelector('.npc-choice');

  const moves = ['rock', 'paper', 'scissors'];
  const npcMove = moves[Math.floor(Math.random() * moves.length)];

  if (npcMove === 'rock') {
    npcIcon.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace');
    npcIcon.classList.add('rotate-315', 'fa-hand-rock');
  } else if (npcMove === 'paper') {
    npcIcon.classList.remove('fa-question-circle', 'fa-hand-rock', 'fa-hand-peace');
    npcIcon.classList.add('rotate-315', 'fa-hand-paper');
  } else {
    npcIcon.classList.remove('fa-question-circle', 'fa-hand-rock', 'fa-hand-paper');
    npcIcon.classList.add('rotate-315', 'fa-hand-peace');
  }

  return npcMove;
}

function endGame(result) {
  selections.forEach((selection) => {
    selection.classList.add('end-game');
  });

  if (result) {
    finalResult.classList.add('win');
    finalResult.innerHTML = 'You won the game!';
  } else {
    finalResult.classList.add('loose');
    finalResult.innerHTML = 'You loose the game!';
  }
}

function playRound(pcMove) {
  let roundInfo = [];

  roundInfo = checkWinner(pcMove, oponent());
  roundCounter += 1;
  roundCount.innerHTML = roundCounter;

  if (roundInfo[0] === 'win') {
    roundResult.classList.add('win');
    roundResult.classList.remove('loose', 'tie');
    roundResult.innerHTML = `${roundInfo[1]} beats ${roundInfo[2]}`;
    winCounter += 1;
  } else if (roundInfo[0] === 'loose') {
    roundResult.classList.add('loose');
    roundResult.classList.remove('win', 'tie');
    roundResult.innerHTML = `${roundInfo[2]} beats ${roundInfo[1]}`;
    looseCounter += 1;
  } else if (roundInfo[0] === 'tie') {
    roundResult.classList.add('tie');
    roundResult.classList.remove('win', 'loose');
    roundResult.innerHTML = 'Tie';
    tieCounter += 1;
  }

  winScore.innerHTML = winCounter;
  tieScore.innerHTML = tieCounter;
  looseScore.innerHTML = looseCounter;

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
  const npcIcon = document.querySelector('.npc-choice');

  roundCounter = 0;
  winCounter = 0;
  tieCounter = 0;
  looseCounter = 0;

  selections.forEach((selection) => {
    selection.classList.remove('end-game');
  });

  npcIcon.classList.remove('rotate-315', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  npcIcon.classList.add('fa-question-circle');

  finalResult.classList.remove('loose', 'win');
  finalResult.innerHTML = '';
  roundResult.classList.remove('win', 'tie', 'loose');
  roundResult.innerHTML = 'Choose your move';
  roundCount.innerHTML = '0';
  tieScore.innerHTML = '0';
  winScore.innerHTML = '0';
  looseScore.innerHTML = '0';
}

startGame();

newGame.addEventListener('click', () => {
  reset();
});
