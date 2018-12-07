var players = ["ronaldo", "messi", "modrich", "kane", "naymar", "eto", "swanstiger", "morata",
    "martial", "johnson", "", "ivramovic", "lampard", "beckham", "salah", "honda"];

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var gameStarted = false;
var currentWord;
var wordAsDashes;
var letterGuessed;
var correctGuesses;
var guessLeft;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace;
var wordAsArr = [];
var dashesArray = [];

function initialize() {
    gameStarted = true;
    lettersGuessed = [];
    correctGuesses = 0;
    wordPlace = Math.floor(Math.random() * 15);
    currentWord = players[wordPlace];
    guessesLeft = 17 - currentWord.length;
    wordAsDashes = makeIntoDashes(currentWord);
    wordAsArr = currentWord.split('');
    dashesArray = wordAsDashes.split('');
    document.getElementById("currentWord").innerHTML = wordAsDashes;
    document.getElementById("letterGuessed").innerHTML = "--";
    document.getElementById("guessLeft").innerHTML = guessesLeft;
}


function makeIntoDashes(word) {
    var dashes = "";
    for (i = 0; i < word.length - 1; i++) {
        dashes += "_ ";
    }
    dashes += "_";
    return dashes;
}

function playGame(letter) {
    var letter = letter.toLowerCase();


    if (alphabet.indexOf(letter) > -1) {
        if (wordAsArr.indexOf(letter) > -1) {
            correctGuesses++;
            displayLetter(letter);
        }
        else {
            if (lettersGuessed.indexOf(letter) > -1) {
                return;
            }
            else {
                guessesLeft--;
                document.getElementById("guessLeft").innerHTML = guessesLeft;
                lettersGuessed.push(letter);
                document.getElementById("letterGuessed").innerHTML = lettersGuessed.join(' ');
                if (guessesLeft == 0) {
                    alert("Sorry! The correct answer is " + currentWord);
                    initialize();
                    numLosses++;
                    document.getElementById("losses").innerHTML = numLosses;
                }
            }
        }
    }
}


function displayLetter(letter) {

    for (i = 0; i < currentWord.length; i++) {
        if (letter == wordAsArr[i]) {
            dashesArray[i * 2] = letter;
            console.log(dashesArray);
        }
    }
    document.getElementById("currentWord").innerHTML = dashesArray.join("");
    checkForWin();
}


function checkForWin() {
    if (dashesArray.indexOf("_") === -1) {
        alert("You got it! The correct answer is " + currentWord);
        numWins++;
        document.getElementById("wins").innerHTML = numWins;
        initialize();
    }
}

document.onkeyup = function (event) {
    if (!gameStarted) {
        document.getElementById("letsPlay").innerHTML = "";
        initialize();
        document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
        console.log(currentWord);
        gameStarted = true;
    }
    else {
        playGame(event.key);
    }
}