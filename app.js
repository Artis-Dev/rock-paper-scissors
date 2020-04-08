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
