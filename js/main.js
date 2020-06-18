//Create a player factory
//Create a Gameboard Module





const gameboard = (() => {
    //Create a blank array with size 9
    let board = new Array(9);

    const updateArray = (playerToken,i) => {
        board.splice(i, 1, playerToken,);
        displayController.updateGameTiles();
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    //Computer's Turn
    const computerMove = () => {
        i = getRandomInt(9);
        if (board[i] !== undefined) {
            i = getRandomInt(9);
        }
        updateArray("O",i);
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
        for (let i = 0; i < 7; i++) {
            if (board[WINCONDITIONS[i][0]] === "X" && board[WINCONDITIONS[i][1]] === "X" && board[WINCONDITIONS[i][2]] === "X") {
                console.log("You Win");
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


    //Return for closure
    return {
        render,
        updateGameTiles
    };
})();






window.onload = function () {
    displayController.render();
  };    