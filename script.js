let cells = document.querySelectorAll(".cell") // list of cells
let playerTurn = "X"
let gameBoard = [
    '_', '_', '_',
    '_', '_', '_',
    '_', '_', '_'
]

let winningPattern;
let startPosition;
let endPosition;

// let canvas = document.getElementById("crossOutAnimation")
// let ctx = canvas.getContext('2d')
let boardPosition = document.querySelector('#gameBoard').getBoundingClientRect();
// canvas.style.top = boardPosition.top + 'px';
// canvas.style.left = boardPosition.left + 'px';
// ctx.clearRect(0, 0, canvas.width, canvas.height);

// Iterate through the arr of cells to add event handlers and prepare for when each one is clicked
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        cellClicked(cells[i])
    })
}


// Upon clicking some cells, do this
function cellClicked(cell) {


    // If the cell is taken, don't do anything
    if (cell.innerHTML != "") {
        return;
    }

    // Setting the value inside the box
    cell.innerHTML = playerTurn;

    // Getting the actual index value
    let index = cell.getAttribute("data-cell")
    console.log(index)


    // Setting the value inside the array
    gameBoard[index] = playerTurn


    // Whether or not the game is won 
    let isEnd = checkWin(cell)


    // If the game is won, render the end game screen
    if (isEnd) {
        endGame()
    }




    // End of turn, switching turns
    if (playerTurn == "X") {
        playerTurn = "O"
    } else {
        playerTurn = "X"
    }

}


// Function to check who won
function checkWin() {

    let winningBoard = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]


    for(let i = 0; i < winningBoard.length; i++){

        // Spaces are filled in
        if(gameBoard[winningBoard[i][0]] != "_" && gameBoard[winningBoard[i][1]] != "_" && gameBoard[winningBoard[i][2]] != "_"){
            // Win condition
            if(gameBoard[winningBoard[i][0]] == gameBoard[winningBoard[i][1]] && gameBoard[winningBoard[i][1]] == gameBoard[winningBoard[i][2]]){
                winningPattern = winningBoard[i]
                console.log(winningPattern)
                return true;
            }
        }

    }

    return false;
}



function endGame() {



    // We need the edge positions to determine the points

    // Gather our positions for this 
    startPosition = document.querySelector(`[data-cell="${winningPattern[0]}"]`)
    endPosition = document.querySelector(`[data-cell="${winningPattern[2]}"]`)


    let positionObj1 = startPosition.getBoundingClientRect()
    let positionObj2 = endPosition.getBoundingClientRect();


    let svg = document.getElementById("lineAnimation");

    // Create a line element for the SVG
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");



    // Set attributes for the line
    line.setAttribute("x1", positionObj1.x + positionObj1.width / 2);
    line.setAttribute("y1", positionObj1.y + positionObj1.height / 2);
    line.setAttribute("x2", positionObj2.x + positionObj2.width / 2);
    line.setAttribute("y2", positionObj2.y + positionObj2.height / 2);
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "5");

    // Append the line to the SVG element
    svg.appendChild(line);

    // ctx.beginPath()
    // ctx.moveTo(positionObj1.x + (positionObj1.width/2), positionObj1.y + (positionObj1.height/2))
    // ctx.lineTo(positionObj2.x + (positionObj2.width/2), positionObj2.y + (positionObj2.height/2))
    // ctx.strokeStyle = "red"
    // ctx.stroke();

    // console.log(positionObj1.x + (positionObj1.width/2), positionObj1.y + (positionObj1.height/2))
    // console.log(positionObj2.x + (positionObj2.width/2), positionObj2.y + (positionObj2.height/2))


    console.log(canvas)
    console.log(`${playerTurn} Wins!`)
}


