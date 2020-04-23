const newGame = document.querySelector('.start');

let roundCounter = 0;
let winCounter = 0;
let tieCounter = 0;
let looseCounter = 0;

function playRound(pcSelection, npcSelection) {
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
  const moves = ['rock', 'paper', 'scissors'];
  const npcMove = moves[Math.floor(Math.random() * moves.length)];

  const npcIcon = document.querySelector('.npc-choice');

  if (npcMove === 'rock') {
    npcIcon.classList.remove('fa-hand-paper', 'fa-hand-peace');
    npcIcon.classList.add('fa-hand-rock');
  } else if (npcMove === 'paper') {
    npcIcon.classList.remove('fa-hand-rock', 'fa-hand-peace');
    npcIcon.classList.add('fa-hand-paper');
  } else {
    npcIcon.classList.remove('fa-hand-rock', 'fa-hand-paper');
    npcIcon.classList.add('fa-hand-peace');
  }

  return npcMove;
}

function round(pcMove) {
  let roundInfo = [];

  const roundResult = document.querySelector('.round-result');
  const roundCount = document.querySelector('.round-count');
  const winScore = document.querySelector('.wins');
  const tieScore = document.querySelector('.ties');
  const looseScore = document.querySelector('.looses');

  roundInfo = playRound(pcMove, oponent());
  roundCounter += 1;
  roundCount.innerHTML = `Round: ${roundCounter}`;
  if (roundInfo[0] === 'win') {
    roundResult.classList.add('win');
    roundResult.classList.remove('loose', 'tie');
    roundResult.innerHTML = `${roundInfo[1]} wins against ${roundInfo[2]}`;
    winCounter += 1;
  } else if (roundInfo[0] === 'loose') {
    roundResult.classList.add('loose');
    roundResult.classList.remove('win', 'tie');
    roundResult.innerHTML = `${roundInfo[1]} looses against ${roundInfo[2]}`;
    looseCounter += 1;
  } else if (roundInfo[0] === 'tie') {
    roundResult.classList.add('tie');
    roundResult.classList.remove('win', 'loose');
    roundResult.innerHTML = 'TIE';
    tieCounter += 1;
  }
  winScore.innerHTML = `Wins: ${winCounter}`;
  tieScore.innerHTML = `Ties: ${tieCounter}`;
  looseScore.innerHTML = `Looses: ${looseCounter}`;
}

function startGame() {
  const selections = document.querySelectorAll('.selection');

  selections.forEach((selection) => {
    selection.addEventListener('click', () => {
      if (selection.classList.contains('rock')) {
        round('rock');
      } else if (selection.classList.contains('paper')) {
        round('paper');
      } else {
        round('scissors');
      }
    });
  });
}

function reset() {
  const roundResult = document.querySelector('.round-result');
  const roundCount = document.querySelector('.round-count');
  const winScore = document.querySelector('.wins');
  const tieScore = document.querySelector('.ties');
  const looseScore = document.querySelector('.looses');
  const npcIcon = document.querySelector('.npc-choice');

  roundCounter = 0;
  winCounter = 0;
  tieCounter = 0;
  looseCounter = 0;

  npcIcon.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  npcIcon.classList.add('fa-question-circle');

  roundResult.classList.remove('win', 'tie', 'loose');
  roundResult.innerHTML = 'Choose your move';
  roundCount.innerHTML = 'Round: 0';
  winScore.innerHTML = 'Wins: 0';
  tieScore.innerHTML = 'Ties: 0';
  looseScore.innerHTML = 'Looses: 0';
}

startGame();

newGame.addEventListener('click', () => {
  reset();
});
