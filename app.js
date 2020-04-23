const startGame = document.querySelector('.start');

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
    case pcSelection === 'rock' && npcSelection === 'scissors':
    case pcSelection === 'paper' && npcSelection === 'rock':
    case pcSelection === 'scissors' && npcSelection === 'paper':
      result = 'win';
      break;
    default:
      break;
  }
  console.log(result);
  return result;
}

function npcPlay() {
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

function pcPlay() {
  const selections = document.querySelectorAll('.selection');

  selections.forEach((selection) => {
    selection.addEventListener('click', () => {
      if (selection.classList.contains('rock')) {
        console.log('ROCK');
        return playRound('rock', npcPlay());
      } if (selection.classList.contains('paper')) {
        console.log('PAPER');
        return playRound('paper', npcPlay());
      }
      console.log('SCISSORS');
      return playRound('scissors', npcPlay());
    });
  });
}

function start() {
  const rounds = 5;
  let finalResult;
  let finalText;
  let winScore = 0;
  let looseScore = 0;
  let tieScore = 0;

  const roundResult = document.querySelector('.round-result');
  const npcIcon = document.querySelector('.npc-choice');

  npcIcon.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-peace');
  npcIcon.classList.add('fa-question-circle');

  roundResult.innerHTML = 'Choose your move';

  // for(let i = 1; i <= rounds; i++) {
  if (roundResult === 'win') {
    winScore += 1;
  } else if (roundResult === 'loose') {
    looseScore += 1;
  } else if (roundResult === 'tie') {
    tieScore += 1;
  }
  // }

  if (winScore > looseScore) {
    finalResult = 'YOU WON!';
  } else if (winScore < looseScore) {
    finalResult = 'YOU LOOSE';
  } else {
    finalResult = 'TIE';
  }

  //   finalText = `FINAL SCORE
  // -----------
  // Wins: ${winScore}
  // Looses: ${looseScore}
  // Ties: ${tieScore}
  // {finalResult}`

  return console.log('NEW GAME');
}

pcPlay();

startGame.addEventListener('click', () => {
  start();
});
