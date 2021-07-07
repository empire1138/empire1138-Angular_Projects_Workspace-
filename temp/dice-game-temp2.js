let playerNumberArray = [];
let playerTotalScoreArray = []
let diceRollArray = [];
const playerLives = 6;
const numberOfDIce = 6;
const numberOfPlayer = 4;


function returnRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function initStartGame(numberOfPlayer) {
    for (i = 0; i < numberOfPlayer; i++) {
        playerNumberArray[i] = 6;
        playerTotalScoreArray[i] = 0;
        diceRollArray[i] = [];

        for (j = 0; j < numberOfDIce; j++) {
            diceRollArray[i][j] = 0;

        }
    }

}

function addDiceRollBtn(numberOfPlayer, numberOfDIce) {
    for (i = 0; i < numberOfPlayer; i++) {
        for (j = 0; j < numberOfDIce; j++) {
            let randomNumber = returnRandomNumber();
            playerTotalScoreArray[i] += randomNumber;
            diceRollArray[i][j] += randomNumber;
        }
    }
    console.log(diceRollArray, 'Dice Roll array')
    console.log(playerTotalScoreArray, 'The dice roll Array')
}

function lowestIndexValue(numberOfPlayer) {
    let lowestIndexValue = 0;
    let lowestIndexValueArray = [];
    let lowestValueInArray = Math.min(...playerTotalScoreArray);

    console.log(lowestValueInArray, 'Lowest Value');

    for (i = 1; i < numberOfPlayer; i++) {
        if (playerTotalScoreArray[i] < playerTotalScoreArray[lowestIndexValue]) {
            lowestIndexValue = i;
            console.log(lowestIndexValue, 'indexvalue');
        }
    }
    for (i = 1; i < numberOfPlayer; i++) {
        if (playerTotalScoreArray.indexOf(playerTotalScoreArray[i]) !== playerTotalScoreArray.lastIndexOf(playerTotalScoreArray[i])) {
            console.log(playerTotalScoreArray.indexOf(playerTotalScoreArray[i]), '456');
            console.log(playerTotalScoreArray.lastIndexOf(playerTotalScoreArray[i]), '789')

            const firstMatchingIndex = playerTotalScoreArray.indexOf(playerTotalScoreArray[i]);
            const secondMatchingIndex = playerTotalScoreArray.lastIndexOf(playerTotalScoreArray[i]);

            if (lowestValueInArray === playerTotalScoreArray[firstMatchingIndex] || lowestValueInArray === playerTotalScoreArray[secondMatchingIndex]) {
                lowestIndexValueArray.push(playerTotalScoreArray.indexOf(playerTotalScoreArray[i]))
                lowestIndexValueArray.push(playerTotalScoreArray.lastIndexOf(playerTotalScoreArray[i]))
                return lowestIndexValueArray;
            }
        }
    }
    console.log(lowestIndexValue, 'indexvalue2');
    return lowestIndexValue;
}







function calcDiceGame(numberOfDIce, numberOfPlayer) {
    initStartGame(numberOfPlayer);
    addDiceRollBtn(numberOfPlayer, numberOfDIce);
    const indexValue = lowestIndexValue(numberOfPlayer);

    console.log(indexValue, 'index check');

    if (Array.isArray(indexValue)) {
        for (i = 0; i < 2; i++) {
            console.log(indexValue[i]);
            playerNumberArray[indexValue[i]] -= 1;

        }
    } else {
        playerNumberArray[indexValue] -= 1;
    }

    console.log(playerNumberArray, 'Last check');
}



calcDiceGame(numberOfDIce, numberOfPlayer);








    // console.log(playerNumberArray, 'before calc ');
    // for (i = 0; i < numberOfPlayer; i++) {
    //     let lowestIndexValue = 0;
    //     if (playerTotalScoreArray[i] === playerTotalScoreArray[i + 1]) {
    //         playerNumberArray[i] -= 1;

    //         playerNumberArray[i + 1] -= 1;

    //     } else if (playerTotalScoreArray[i] < playerTotalScoreArray[i + 1]) {
    //         lowestIndexValue = i;
    //         console.log(playerNumberArray[i], 'step1');
    //         console.log(playerNumberArray[i + 1], 'step2');
    //     }
    //     playerNumberArray[lowestIndexValue] -= 1;
    // }
    // console.log(playerNumberArray, 'after calc');

    // for(i = 1; i < numberOfPlayer; i++) {
    //     if ( playerTotalScoreArray[i] !== playerTotalScoreArray[lowestIndexValue]){
    //         console.log(lowestIndexValue,'indexvalue1');
    //         return lowestIndexValueArray[i,lowestIndexValue];
    //     }