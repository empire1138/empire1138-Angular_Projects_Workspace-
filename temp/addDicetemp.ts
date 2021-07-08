 //Calls the Random Number Gen and Adds then to the Player total score
 addDiceRoll() {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      if (this.playerLivesNumberArray[i] === 0) {
        this.playersTotalScoreArray.splice(i, 1, NaN);
        this.playerLivesNumberArray.splice(i, 1, NaN);
        this.numberOfAlivePlayers -= 1;
        console.log([this.numberOfAlivePlayers], 'number of alive players')
      }
      if (this.numberOfAlivePlayers === 1) {
        //console.log("I got Broked")
        break
      }
    }

    if (this.numberOfAlivePlayers === 1) {
      console.log('go to winning page')
      this.gotoWinningPage()
    }

    console.log(this.playersTotalScoreArray, 'players score')
    console.log(this.playerLivesNumberArray, 'players lives')
    for (let i = 0; i < this.numberOfPlayers; i++) {
      for (let j = 0; j < this.numberOfDice; j++) {
        let randomNumber = this.returnRandomNumber();
        this.playersTotalScoreArray[i] += randomNumber;
        this.diceRollArray[i][j] += randomNumber;

      }
    }
    console.log(this.diceRollArray, ' Dice Roll Array after loading');
  }

function addDiceRoll() {
    throw new Error("Function not implemented.");
}
