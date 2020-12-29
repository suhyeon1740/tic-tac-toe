"use strict"
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("#board")
const winningMessage = document.querySelector(".winning-message")
const winningMessageText = document.querySelector("[data-winning-message-text]")
const restartButton = document.querySelector("#restartButton")
let circleTurn

startGame()

restartButton.addEventListener("click", restartGame)

function startGame() {
    circleTurn = false
    winningMessage.classList.remove("show")
    cellElements.forEach((cell) => {
        cell.addEventListener("click", handleClick, { once: true }) // 모든 셀은 한번만 클릭 가능
    })
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (winCheck(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
        board.classList.remove(X_CLASS)
    } else {
        board.classList.add(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
    }
}

function winCheck(currentClass) {
    // some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다.
    return WINNING_COMBINATIONS.some((combination) => {
        //every() 메서드는 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트합니다.
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageText.textContent = `Draw!`
    } else {
        winningMessageText.textContent = `${circleTurn ? "O" : "X"}'s Win!`
    }
    winningMessage.classList.add("show")
}

function isDraw() {
    return [...cellElements].every((cell) => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}
function restartGame() {
    removeAllMark()
    startGame()
}

function removeAllMark() {
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
    })
}
