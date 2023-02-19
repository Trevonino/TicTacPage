WinPriorities = [0, 0, 0, 0, 0, 0, 0, 0];
chosenMove = 0;

//ROLL A NUMBER BEFORE HAND TO SEE IF IT SHOULD FAVOR OPEN ROWS VS CONTESTING A ROW

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

var arrayAllMaxIndexes = function (array) {
    return getAllIndexes(array, Math.max.apply(null, array));
}

var generateValidMove = function () {
    temp = Math.floor(Math.random() * 3);
    if (gameStatus[winCons[chosenWinCon][temp]] == ""){
        chosenMove = winCons[chosenWinCon][temp];
        return;
    }
    else {
        generateValidMove();
    }
}

var getWinPriorities = function () {
    for (var i = 0; i <= 7; i++) {
        const winCondition = winCons[i];
        usedSpaces = 0;
        winConValue = 0;
        for (j = 0; j < 3; j++) {
            switch (gameStatus[winCondition[j]]) {
                case 'X':
                    winConValue--;
                    usedSpaces++;
                    break;
                case 'O':
                    winConValue++;
                    usedSpaces++;
                    break;
            }
        }

        if (usedSpaces == '3') {
            WinPriorities[i] = 0;
        }
        else {
            switch (winConValue) {
                case 2:
                    WinPriorities[i] = 5;
                    break;
                case -2:
                    WinPriorities[i] = 4;
                    break;
                case 1:
                    WinPriorities[i] = 3;
                    break;
                case 0:
                    WinPriorities[i] = 2;
                    break;
                case -1:
                    WinPriorities[i] = 1;
                    break;
            }
        }
    }
}

var chooseMove = function () {
    console.log("chooseMove called");
    if (gameStatus[4] == "") {
        chosenMove = 4;
    }
    else {
        potentialWinCons = arrayAllMaxIndexes(WinPriorities);
        priority = WinPriorities[potentialWinCons[0]];

        chosenWinCon = potentialWinCons[Math.floor(Math.random() * potentialWinCons.length)];

        switch (priority) {
            case 5:
                for (var i = 0; i < 3; i++) {
                    if (gameStatus[winCons[chosenWinCon][i]] == "") {
                        chosenMove = winCons[chosenWinCon][i];
                        break;
                    }
                }
            case 4:
                for (var i = 0; i < 3; i++) {
                    if (gameStatus[winCons[chosenWinCon][i]] == "") {
                        chosenMove = winCons[chosenWinCon][i];
                        break;
                    }
                }
            default:
                generateValidMove();
        }
    }
}


var playMove = function () {
    $('td')[chosenMove].click();
}