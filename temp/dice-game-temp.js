const playerNumberArray = [];
const playerTotalScoreArray = []
const playerLives = 6; 
const numberOfDIce =6;
const numberOfPlayer = 4;


function returnRandomNumber(numberOFDice){
    return  Math.floor(Math.random() * (numberOFDice * 6)) + 1;
}

function calcDiceGame(numberOfPlayer){

    
    for(i=0; i< numberOfPlayer; i++){
        playerNumberArray[i] = 6;
        console.log(returnRandomNumber(numberOfDIce));
    }

    

}

calcDiceGame(numberOfPlayer);