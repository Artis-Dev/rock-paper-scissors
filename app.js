function npcPlay() {
  const moves = ['rock', 'paper', 'scissors'];

  function randomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  return randomMove();
}

function pcPlay() {
  let pcMove = prompt('Your move (Rock, Paper or Scissors):');
  return pcMove.toLowerCase();
}

function playRound(pcSelection, npcSelection) {
  let result;

  switch(true) {
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
  }
  return result;
}
