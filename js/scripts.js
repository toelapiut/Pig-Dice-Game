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


// probability section if the play scores a 1


Referee.prototype.switchPlayer =  function (){
  if (this.players[0].turn === 1){
    this.players[0].turn = 0;
    this.players[1].turn = 1;

  }else if (this.players[1].turn === 1){
    this.players[0].turn = 1;
    this.players[1].turn = 0;
  }

}



Referee.prototype.runningTotal = function (player) {
  player.score += player.runningTotal;
  player.runningTotal = 0;
}



// random number selection section


Referee.prototype.throw = function (){
  var result = Math.floor((Math.random() * 6) + 1);    //random method
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


 // section on the hold key


Referee.prototype.hold = function (){
  if (this.players[0].turn === 1){
    this.runningTotal(this.players[0]);
    this.switchPlayer();

  } else if (this.players[1].turn === 1){
    this.runningTotal(this.players[1]);
    this.switchPlayer();

  }
}

Referee.prototype.pickPlayer = function (){
  this.players[0].turn = 1;
}


// declaration of the winner


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
}


//interface functions
function switchClass(player1, player2){
  if (player1.turn === 1){
    $("div.player1").addClass("highlight");
    $("div.player2").removeClass("highlight");
  }else if (player2.turn === 1){
    $("div.player1").removeClass("highlight");
    $("div.player2").addClass("highlight");

  }
}

function showScore(player1, player2){
  $("#player1RunningTotal").text("Running Total: " + player1.runningTotal);
  $("#player2RunningTotal").text("Running Total: " + player2.runningTotal);

  $("#player1Total").text("Total: " + player1.score);
  $("#player2Total").text("Total: " + player2.score);
}

function showDice (dice){
  if (dice >= 1){
    $("img").attr("src","img/" + dice + ".png").hide().fadeIn();
  }

}


//user interface

$(document).ready(function (){
  var gameChoice = $('input:radio[name=gameChoice]:checked').val();
  var player1 = new Player ("mister");
  var player2 = new Player (gameChoice);
  var toelTheReferee = new Referee ();


  toelTheReferee.players.push(player1, player2);
  toelTheReferee.pickPlayer();



  $("#gameChoice").click(function (){
    gameChoice = $('input:radio[name=gameChoice]:checked').val();
    if (gameChoice === "ai"){
      // console.log("ai");
      toelTheReferee.players[1].playerID = "ai";



    }
    $(this).parent().parent().fadeOut(700, function (){  //parent() method traverses to the immediate parent of each of these elements
      $("#twoPlayer").fadeIn();
    });
  });


 // showing of the hold and roll section....play section


  setInterval(function (){   //setInterval() method will be used to time events
    if (player2.playerID === "ai" && player2.turn ===1 ){
      if (player2.runningTotal <= 15){
          toelTheReferee.throw();     //Execution of the current function will stop (the statements after throw won't be executed
          $("#hold").hide();
          $("#roll").hide();
      }else {
        toelTheReferee.hold();
        $("#hold").fadeIn();
        $("#roll").fadeIn();
      }
      if(player2.turn ===0){
        $("#hold").fadeIn();
        $("#roll").fadeIn();
      }


// section of the declarion of the winner

      toelTheReferee.checkGame();
      if (toelTheReferee.gameover === 1){
        $("#winner").show().text(toelTheReferee.winner + "wins!!!");
      }
      showDice(toelTheReferee.dice);
      showScore(player1, player2);
      switchClass(player1, player2);

    }

  }, 900);

// press roll section to run the random number

  $("#roll").click(function (){
    toelTheReferee.checkGame();
    toelTheReferee.throw();


    showDice(toelTheReferee.dice);
    showScore(player1, player2);
    switchClass(player1, player2);

    if (toelTheReferee.gameover === 1){
      $("#winner").show().text(toelTheReferee.winner + "wins!!!");
    }


  });

 // press hold to pass section

  $("#hold").click(function (){

    toelTheReferee.hold();
    showScore(player1, player2);
    toelTheReferee.checkGame();

    switchClass(player1, player2);
    showDice(player1, player2);

    if (toelTheReferee.gameover === 1){
      $("#winner").show().text(toelTheReferee.winner + "wins!!!");
    }
  });
});
