//Create the game engine module
const gameboard = (() => {
    //Create a blank array with size 9
    let board = new Array(9);
    let gameOver = false;

    //Update the array with a token and a position.
    const updateArray = (token, position) => {
        if (gameOver === false){
            if (board[position] === undefined){
                board.splice(position, 1, token);
                displayController.updateGameTiles();
                checkWinConditions();
                //If this token was an X have the computer make a move
                if (token === "X") {
                    computerMove();
                }
            }
        }
    }

    //Create a random integer
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    //Computer's Random Turn
    const computerMove = () => {
        if (gameOver === false){
            //Get a Random Number btw 0-8
            randomPosition = getRandomInt(9);
            //If that square is already taken, try again.
            if (board[randomPosition] !== undefined) {
                computerMove();
            }
            updateArray("O",randomPosition);
            checkWinConditions();
        } 
    }

    //Check win conditions
    const WINCONDITIONS = {
        0 : [0,1,2],
        1 : [3,4,5],
        2 : [6,7,8],
        3 : [0,3,6],
        4 : [1,4,7],
        5 : [2,5,8],
        6 : [0,4,8],
        7 : [2,4,6],
    }
    const checkWinConditions = () => {
        //If all squares are filled w/ no winner, open a modal w/ Draw
        if (board.includes(undefined) === false){
            displayController.displayResultModal("tie");
            gameOver = true;
        }
        for (let i = 0; i < 8; i++) {
            //If win conditions met w/ Xs open modal w/ Player Wins
            if (board[WINCONDITIONS[i][0]] === "X" && board[WINCONDITIONS[i][1]] === "X" && board[WINCONDITIONS[i][2]] === "X") {
                displayController.displayResultModal("X");
                gameOver = true;
            }
            if (board[WINCONDITIONS[i][0]] === "O" && board[WINCONDITIONS[i][1]] === "O" && board[WINCONDITIONS[i][2]] === "O") {
                displayController.displayResultModal("O");
                gameOver = true;
            }
        }
    }

    //Return for closure
    return {
        board,
        updateArray,
        computerMove,
        checkWinConditions
    };
})();

//Create Display Controller Module
const displayController = (() => {

    //Get the location for the Board
    let container = document.getElementById("container");

    //Draw the Gameboard
    const render = () => {
        createGameTiles();
    };

    //Create the game tiles
    const createGameTiles = () =>{
        container.innerHTML = ("")
        for (let i = 0; i < gameboard.board.length; i++) {
            let gameTile = document.createElement("div");
            gameTile.classList.add("gametile");
            gameTile.id = i;
            gameTile.addEventListener("click", function () {
                gameboard.updateArray("X",i);
            });
            container.appendChild(gameTile);
        }
    }

    //Update Game Tiles
    const updateGameTiles = () => {
        for (let i = 0; i < gameboard.board.length; i++) {
            let gameTile = document.getElementById(i);
            if (gameboard.board[i] !== undefined){
                gameTile.innerText = gameboard.board[i]
            }
            gameboard.checkWinConditions();
        } 
    }

    //Display the Win Modal
    const displayResultModal = (gameResult) => {
        //Get the modal dom element
        var modal = document.getElementById("result-modal");
        //Get the winner message block
        var resultMessage = document.getElementById("result-message")
        //Get the newgame button dom element
        var btn = document.getElementById("new-game");
        //Get the close modal button
        var span = document.getElementsByClassName("close")[0];
        //Display the Modal
        modal.style.display = "block";
        //Display the winner message
        if (gameResult === "X"){
            resultMessage.innerText = "Player Wins!"
        }
        if (gameResult === "O"){
            resultMessage.innerText = "Computer Wins... Somehow"
        }
        if (gameResult === "tie"){
            resultMessage.innerText = "A draw!"
        }
        //Add an event to close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        //Add event to restart the game
        btn.onclick = function(){
            modal.style.display = "none";
            location.reload();
        }
    }

    //Return for closure
    return {
        render,
        updateGameTiles,
        displayResultModal
    };
})();


//On window load create the gameboard
window.onload = function () {
    displayController.render();
  };    