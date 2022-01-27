const NUM_ROWS = 6;
const NUM_COLS = 5;

function createBoard() {
  let gameBoard = document.querySelector("#game-board");

  for (let i = 0; i < NUM_ROWS; i++) {
    let row = document.createElement("div");
    row.id = `row${i}`;
    row.classList.add("board-row");
    gameBoard.appendChild(row);

    for (let j = 0; j < NUM_COLS; j++) {
      let tile = document.createElement("div");
      tile.classList.add("board-tile");
      row.appendChild(tile);

    }
  }
}

createBoard();

function createKeyboard() {
  let keyboard = document.querySelector("#keyboard");
  let keyboardRow;

  let keysArray = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 
    'A', 'S', 'D','F','G','H','J','K','L',
    'ENTER','Z','X','C','V','B','N','M','DEL'
  ];

  for (let key of keysArray) {
    if (['Q', 'A', 'ENTER'].includes(key)) {
      keyboardRow = document.createElement("div");
      keyboardRow.classList.add("keyboard-row");
      keyboard.appendChild(keyboardRow);
    }

    let keyButton = document.createElement("button");
    keyButton.id = key;
    keyButton.classList.add("key-button");
    keyButton.innerHTML = key;
    keyButton.onclick = test;
    keyboardRow.appendChild(keyButton);
  }
}

createKeyboard();

function test() {
  console.log("test")
}

window.onkeyup = function(pressedKey) {
  console.log(pressedKey);
}