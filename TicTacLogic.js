var gameMode = 0;

var gameStatusDisplay = $('#gameStatus');

var gameActive = true;

var roundWon = false;

var roundDraw = false;

var currentPlayer = 'X';

var gameStatus = ["", "", "", "", "", "", "", "", ""];

var turns = [];

var textColor = "red";

const winCons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function chooseMode(mode) {
    gameMode = mode;
    $('#gamemodePopup').hide();
    $('#backgroundBlur').hide()
}

//Function For When A Box is Clicked
function handleCellClicked(cellClicked) {
    const cellClickedIndex = cellClicked.getAttribute('data-cell-index');

    if (gameStatus[cellClickedIndex] != "" || !gameActive) {
        return;
    }

    handleCellPlayed(cellClicked, cellClickedIndex);
    handleResultValidation();
}

/*
Changes Color Of Text Dependent On Player, Sperated From Turn Change To Allow Reset To Set Player To X Every Time
*/
function changeColor() {
    if (currentPlayer == 'X') {
        textColor = "red";
    }
    else {
        textColor = "blue";
    }
}


function handleCellPlayed(cellClicked, cellClickedIndex) {
    turns.push([...gameStatus]);

    cellClicked.style.color = textColor;
    gameStatus[cellClickedIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
}

function handleResultValidation() {

    for (var i = 0; i <= 7; i++) {
        const winCondition = winCons[i];
        winConValue = 0;
        for (j = 0; j < 3; j++) {
            switch (gameStatus[winCondition[j]]) {
                case 'X':
                    winConValue--;
                    break;
                case 'O':
                    winConValue++;
                    break;
            }
        }

        if (winConValue == 3 || winConValue == -3) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        var winMessage = "Player " + currentPlayer.toString() + " has won!";
        gameStatusDisplay.text(winMessage);
        gameActive = false;
        return;
    }

    var roundDraw = !gameStatus.includes("");
    if (roundDraw) {
        var drawMessage = "Game has ended in a draw.";
        gameStatusDisplay.text(drawMessage);
        gameActive = false;
        return;
    }

    turnChange();
}

function turnChange() {

    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    changeColor();
    currentPlayerTurn = "It's " + currentPlayer.toString() + "'s turn."
    gameStatusDisplay.text(currentPlayerTurn);

    //TEST FOR AI
    if (currentPlayer == 'O' && gameMode == 1) {
        getWinPriorities();
        chooseMove();
        playMove();
    }
}

function restartGame() {
    gameActive = true;
    roundWon = false;
    roundDraw = false;
    currentPlayer = 'X';
    gameStatus = ["", "", "", "", "", "", "", "", "",];
    turns = [];
    currentPlayerTurn = "It's " + currentPlayer.toString() + "'s turn."
    gameStatusDisplay.text(currentPlayerTurn);
    changeColor();
    document.querySelectorAll("td").forEach(function (currentTd) {
        currentTd.innerHTML = "&nbsp;";
    });
}

function backTurn() {
    if (gameMode == 0) {
        if (turns[turns.length - 1] != turns[0]) {
            gameStatus = turns[turns.length - 1];
            turns.pop();
            for (i = 0; i < gameStatus.length; i++) {
                if (gameStatus[i] != "") {
                    $('td')[i].innerHTML = gameStatus[i];
                }
                else {
                    $('td')[i].innerHTML = '&nbsp;';
                }
            }
            turnChange();
            if (gameActive == false) {
                roundWon = false;
                roundDraw = false;
                turnChange();
                gameActive = true;
            }
        }
        else if (turns.length == 1){
            gameStatus = turns[0];
            turns.pop();
            for (i = 0; i < gameStatus.length; i++) {
                if (gameStatus[i] != "") {
                    $('td')[i].innerHTML = gameStatus[i];
                }
                else {
                    $('td')[i].innerHTML = '&nbsp;';
                }
            }
            turnChange();
        }
    }
    else {
        if (turns[turns.length - 1] != turns[0]) {
            gameStatus = turns[turns.length - 2];
            turns.pop();
            turns.pop();
            for (i = 0; i < gameStatus.length; i++) {
                if (gameStatus[i] != "") {
                    $('td')[i].innerHTML = gameStatus[i];
                }
                else {
                    $('td')[i].innerHTML = '&nbsp;';
                }
            }
            if (gameActive == false) {
                roundWon = false;
                roundDraw = false;
                gameActive = true;
                turnChange();
            }
        }
        else if (turns.length == 1){
            gameStatus = turns[0];
            turns.pop();
            for (i = 0; i < gameStatus.length; i++) {
                if (gameStatus[i] != "") {
                    $('td')[i].innerHTML = gameStatus[i];
                }
                else {
                    $('td')[i].innerHTML = '&nbsp;';
                }
            }
            turnChange();
        }
    }
}