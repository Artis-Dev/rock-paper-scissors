const selections = document.querySelectorAll('.selection');
const finalResult = document.querySelector('.final-result');
const roundResult = document.querySelector('.round-result');
const statBoxes = document.querySelectorAll('.stat');
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
  const npcChoice = document.querySelector('.npc-choice');

  const moves = ['rock', 'paper', 'scissors'];
  const npcMove = moves[Math.floor(Math.random() * moves.length)];

  if (npcMove === 'rock') {
    npcChoice.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace');
    npcChoice.classList.add('rotate-315', 'fa-hand-rock');
  } else if (npcMove === 'paper') {
    npcChoice.classList.remove('fa-question-circle', 'fa-hand-rock', 'fa-hand-peace');
    npcChoice.classList.add('rotate-315', 'fa-hand-paper');
  } else {
    npcChoice.classList.remove('fa-question-circle', 'fa-hand-rock', 'fa-hand-paper');
    npcChoice.classList.add('rotate-315', 'fa-hand-peace');
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
    statBoxes.forEach((box) => {
      box.classList.add('win-bg');
    });
  } else {
    finalResult.classList.add('loose');
    finalResult.innerHTML = 'You loose the game :(';
    statBoxes.forEach((box) => {
      box.classList.add('loose-bg');
    });
  }
}

function playRound(pcMove) {
  const pcChoice = document.querySelector('.pc-choice');
  const npcChoice = document.querySelector('.npc-choice');

  let roundInfo = [];

  pcChoice.classList.remove('fa-question-circle', 'fa-hand-paper', 'fa-hand-peace', 'fa-hand-rock');
  pcChoice.classList.add('rotate-45', `fa-hand-${pcMove === 'scissors' ? 'peace' : pcMove}`);

  roundInfo = checkWinner(pcMove, oponent());
  roundCounter += 1;

  if (roundInfo[0] === 'win') {
    roundResult.classList.add('win-bg');
    roundResult.classList.remove('loose-bg', 'tie-bg');
    roundResult.innerHTML = `${roundInfo[1]} beats ${roundInfo[2]}`;
    pcChoice.classList.remove('loose');
    npcChoice.classList.remove('win');
    pcChoice.classList.add('win');
    npcChoice.classList.add('loose');
    winCounter += 1;
  } else if (roundInfo[0] === 'loose') {
    roundResult.classList.add('loose-bg');
    roundResult.classList.remove('win-bg', 'tie-bg');
    roundResult.innerHTML = `${roundInfo[2]} beats ${roundInfo[1]}`;
    pcChoice.classList.remove('win');
    npcChoice.classList.remove('loose');
    pcChoice.classList.add('loose');
    npcChoice.classList.add('win');
    looseCounter += 1;
  } else if (roundInfo[0] === 'tie') {
    roundResult.classList.add('tie-bg');
    roundResult.classList.remove('win-bg', 'loose-bg');
    roundResult.innerHTML = 'Tie';
    pcChoice.classList.remove('win', 'loose');
    npcChoice.classList.remove('win', 'loose');
    tieCounter += 1;
  }

  roundCount.innerHTML = roundCounter;
  tieScore.innerHTML = tieCounter;
  winScore.innerHTML = winCounter;
  looseScore.innerHTML = looseCounter;

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
  const pcChoice = document.querySelector('.pc-choice');
  const npcChoice = document.querySelector('.npc-choice');

  roundCounter = 0;
  winCounter = 0;
  tieCounter = 0;
  looseCounter = 0;

  selections.forEach((selection) => {
    selection.classList.remove('end-game');
  });

  statBoxes.forEach((box) => {
    box.classList.remove('win-bg', 'loose-bg');
  });

  npcChoice.classList.remove('rotate-315', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  npcChoice.classList.add('fa-question-circle');
  npcChoice.classList.remove('win', 'loose');
  pcChoice.classList.remove('rotate-45', 'fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  pcChoice.classList.add('fa-question-circle');
  pcChoice.classList.remove('win', 'loose');
  finalResult.classList.remove('loose', 'win');
  finalResult.innerHTML = 'Good luck';
  roundResult.classList.remove('win', 'tie', 'loose');
  roundResult.innerHTML = '';
  roundCount.innerHTML = '0';
  tieScore.innerHTML = '0';
  winScore.innerHTML = '0';
  looseScore.innerHTML = '0';
  newGame.style.display = 'none';
  roundResult.style.display = 'none';
}

startGame();

newGame.addEventListener('click', () => {
  reset();
});
