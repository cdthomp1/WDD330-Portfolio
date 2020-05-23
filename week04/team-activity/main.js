var currentPlayer = 1;
document.getElementById("currentPlayer").innerText = "one"

function doTheThing(id) {
    if (currentPlayer === 1) {
        document.getElementById(id).innerText = "X";
        document.getElementById("currentPlayer").innerText = "two"
        currentPlayer = 2;
    } else if (currentPlayer === 2) {
        document.getElementById(id).innerText = "O";
        document.getElementById("currentPlayer").innerText = "one"
        currentPlayer = 1;
    }
}

function resetBoard() {
    var allCells = document.getElementsByClassName("cell");

    for( var i = 0; i < allCells.length; i++) {
        allCells[i].innerText = '';
    }

    currentPlayer = 1;
    document.getElementById("currentPlayer").innerText = "one"
}