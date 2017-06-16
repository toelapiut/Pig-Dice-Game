function Player (playerID){
  this.score = 0;
  this.runningTotal = 0;
  this.turn = 0;
  this.playerID = playerID;
}

function Referee (){
  this.players = [];
  this.winner = "";
  this.gameover = 0;
  this.dice = 0;
}

Referee.prototype.switchPlayer =  function (){
  if (this.players[0].turn === 1){
    this.players[0].turn = 0;
    this.players[1].turn = 1;

  }else if (this.players[1].turn === 1){
    this.players[0].turn = 1;
    this.players[1].turn = 0;
  }

};

Referee.prototype.runningTotal = function (player) {
  player.score += player.runningTotal;
  player.runningTotal = 0;
};
Referee.prototype.throw = function (){
  var result = Math.floor((Math.random() * 6) + 1);
  if(this.gameover === 0){
    this.dice = result;
  }
  if (this.players[0].turn === 1) {
    if (result !=1){
      this.players[0].runningTotal += result;
    }else {
      this.players[0].runningTotal = 0;
      this.switchPlayer();
    }
  }else if (this.players[1].turn === 1) {
    if (result !=1){
      this.players[1].runningTotal += result;
    }else {
      this.players[1].runningTotal = 0;
      this.switchPlayer();
    }
  }
};
Referee.prototype.hold = function (){
  if (this.players[0].turn === 1){
    this.runningTotal(this.players[0]);
    this.switchPlayer();

  } else if (this.players[1].turn === 1){
    this.runningTotal(this.players[1]);
    this.switchPlayer();

  }
};

Referee.prototype.pickPlayer = function (){
  this.players[0].turn = 1;
};
Referee.prototype.checkGame = function (){
  if (this.players[0].score >= 100){
    this.players[1].turn = 0;
    this.players[0].turn = 0;
    this.winner = "Player 1 ";
    this.gameover = 1;
  }else if (this.players[1].score >= 100){
    this.players[1].turn = 0;
    this.players[0].turn = 0;
    this.winner = "Player 2 ";
    this.gameover = 1;
  }
};
