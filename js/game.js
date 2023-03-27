'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍉'
const CHERRY = '🍒'
var gCherryInterval

const gGame = {
    score: 0,
    isOn: false
}

var gBoard

function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
  gCherryInterval = setInterval(placeCherry, 8000)
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (
                (i === 1 && j === 1) ||
                (i === 1 && j === size - 2) ||
                (i === size - 2 && j === 1) ||
                (i === size - 2 && j === size - 2)
              ) {
                board[i][j] = POWER_FOOD
              }
        }
    }
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

}


function getEmptyCells() {
  var emptyCells = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({i, j})
      }
    }
  }
  return emptyCells
}

function placeCherry() {
  var emptyCells = getEmptyCells()
  var randomIdx = getRandomIntInclusive(0, emptyCells.length - 1)
  var location = emptyCells[randomIdx]
  gBoard[location.i][location.j] = CHERRY
  renderCell(location, CHERRY)
}





function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location ,'🪦')
    gGame.isOn = false
    var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'

var elMsg = document.querySelector('.user-msg')
elMsg.innerText = 'You Lost'
gGame.score = 0;
const elScore = document.querySelector('.score')
elScore.innerText = gGame.score
}


function checkVictory() {
    var foodCount = 0;
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        if (gBoard[i][j] === FOOD) {
          foodCount++;
        }
      }
    }
    if (foodCount === 0) {
      Victory();
    }
  }

function Victory(){
    console.log('You Won')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

    var elMsg = document.querySelector('.user-msg')
    elMsg.innerText = 'You Won!'
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

var elButton = document.querySelector('.restart-btn')
elButton.innerText = 'Play Again'

elScore.innerText = gGame.score
gGame.score = 0;
}
