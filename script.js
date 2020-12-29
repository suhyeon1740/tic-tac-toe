"use strict"
const app = document.querySelector("#app")
let xTurn = true
const board = [[],[],[]]
app.addEventListener("click", (e) => {
    e.target.textContent = xTurn ? "X" : "O"
    markOnBoard(e.target)
    isFinish()
    xTurn = !xTurn    
})
function markOnBoard(cell) {
    board[cell.dataset.row][cell.dataset.column] = xTurn ? 0 : 1
}
function isFinish() {
    board.map(row => row.map(cell => console.log(cell)))
}
