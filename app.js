function npcPlay() {
  const moves = ['rock', 'paper', 'scissors'];

  return moves[Math.floor(Math.random() * moves.length)];
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

function game() {
  let rounds = 5;
  let roundResult;
  let finalResult;
  let finalText;
  let winScore = 0;
  let looseScore = 0;
  let tieScore = 0;


  for(let i = 1; i <= rounds; i++) {
    roundResult = playRound(pcPlay(), npcPlay());

    if(roundResult === 'win') {
      winScore++;
      console.log('You won a round :)');
    } else if(roundResult === 'loose') {
      looseScore++;
      console.log('You loose a round :(');
    } else if(roundResult === 'tie') {
      tieScore++;
      console.log('Tie :o');
    }
  }

  if (winScore > looseScore) {
    finalResult = 'YOU WON!';
  } else if (winScore < looseScore) {
    finalResult = 'YOU LOOSE';
  } else {
    finalResult = 'TIE';
  }

  finalText = `FINAL SCORE
-----------
Wins: ${winScore}
Looses: ${looseScore}
Ties: ${tieScore}
${finalResult}`

  return console.log(finalText);
}

console.log (`Welcome to Rock Paper Scissors game
To start type: game();`)
