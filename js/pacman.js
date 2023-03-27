'use strict'

const PACMAN = '<img src="images/pacman.gif"/>'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {
            i:2, 
            j:2
        },
        isSuper: false,
        degrees: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper){
            removeGhost(nextLocation)
        } else {

            gameOver()
            return
        }
    }

    if (nextCell === FOOD){
        updateScore(1)
    }else if (nextCell === POWER_FOOD){
        if (!gPacman.isSuper){
            activatePowerFood()
        } else return
    } else if (nextCell === CHERRY){
        updateScore(10)
    } 
    else checkVictory();

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, turnPacman(gPacman.degrees))
}

function getNextLocation(eventKeyboard) {
    console.log('eventKeyboard:', eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.degrees = -90
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.degrees = 0
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.degrees = 90
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.degrees = 180
            nextLocation.j--
            break;
    }
    // DONE: figure out nextLocation
    return nextLocation
}

function activatePowerFood() {
    gPacman.isSuper = true
    setTimeout(function () {
      gPacman.isSuper = false
      ghostsBackToNormal()
    }, 5000)
    ghostToEatable()

  }

  function turnPacman(degrees) {
    return `<div style="transform: rotate(${degrees}deg)">${PACMAN}</div>`
}

  

