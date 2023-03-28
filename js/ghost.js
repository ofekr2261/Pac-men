'use strict';

const GHOST = '👻';
var gGhosts = [];

var gIntervalGhosts;

function createGhosts(board) {
  gGhosts = [];
  // DONE: 3 ghosts and an interval
  for (var i = 0; i < 3; i++) {
    createGhost(board, i);
  }
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function createGhost(board) {
  // DONE
  const ghost = {
    location: {
      i: 2,
      j: 6,
    },
    currCellContent: FOOD,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function moveGhosts() {
  // DONE: loop through ghosts
  // console.log('move ghosts')
  for (var i = 0; i < gGhosts.length; i++) {
    const ghost = gGhosts[i];
    moveGhost(ghost);
  }
}

function moveGhost(ghost) {
  // console.log('move ghost')

  // DONE: figure out moveDiff, nextLocation, nextCell
  const moveDiff = getMoveDiff();
  // console.log('moveDiff:', moveDiff)
  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // DONE: return if cannot move
  if (nextCell === GHOST) return;
  if (nextCell === WALL) return;

  // DONE: hitting a pacman? call gameOver
  if (nextCell === PACMAN) {
    if (gPacman.isSuper) return;
    gameOver();
    return;
  }

  // DONE: moving from current location:
  // DONE: update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // DONE: update the DOM
  renderCell(ghost.location, ghost.currCellContent);

  // DONE: Move the ghost to new location:
  // DONE: update the model
  gBoard[nextLocation.i][nextLocation.j] = GHOST;
  ghost.currCellContent = nextCell;
  ghost.location = nextLocation;
  // DONE: update the DOM
  renderCell(nextLocation, getGhostHTML(ghost));
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4);

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 }; // right
    case 2:
      return { i: 1, j: 0 }; // down
    case 3:
      return { i: 0, j: -1 }; // left
    case 4:
      return { i: -1, j: 0 }; // up
  }
}

function ghostToEatable() {
  gGhosts.forEach(function (ghost) {
    gPacman.isSuper = true;
    renderCell(ghost.location, getGhostHTML(ghost));
    setTimeout(function () {
      gPacman.isSuper = false;
      renderCell(ghost.location, getGhostHTML(ghost));
    }, 5000);
  });
}

function ghostsBackToNormal() {
  gGhosts.forEach((ghost) => {
    ghost.color = ghost.getRandomColor();
    //   gPacman.isSuper = false;
    renderCell(ghost.location, getGhostHTML(ghost));
  });
}

function removeGhost(location) {
  for (var i = 0; i < gGhosts.length; i++) {
    var location = gGhosts[i].location;
    if (location.i === location.i && location.j === location.j) {
      var deadGhost = gGhosts.splice(i, 1)[0];
      checkGhostCrllContent(deadGhost);
      setTimeout(reviveGhost, 5000, deadGhost);
    }
  }
}

function reviveGhost(ghost) {
  gGhosts.push(ghost);
}

function getGhostHTML(ghost) {
  var ghostColor = gPacman.isSuper ? 'blue' : (ghost.color = getRandomColor());
  return `<span style="background-color:${ghostColor};">${GHOST}</span>`;
}

function checkGhostCrllContent(ghost) {
  if (ghost.currCellContent === FOOD) {
    updateScore(1);
    ghost.currCellContent = EMPTY;
  }
}
