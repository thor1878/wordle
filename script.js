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

    gameBoard.firstElementChild.firstElementChild.classList.add("active-tile");
}

function createKeyboard() {
    let keyboard = document.querySelector("#keyboard");
    let keyboardRow;

    let keysArray = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'
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
        keyButton.onclick = function () {
            pressKey(key);
        };
        keyboardRow.appendChild(keyButton);
    }
}

function pressKey(key) {
    let activeTile = document.querySelector('.active-tile');

    if (key.length === 1 && key.match(/[A-Z]/) && activeTile) {

        activeTile.innerHTML = key;
        activeTile.classList.remove('active-tile');

        if (activeTile.nextElementSibling) {
            activeTile.nextElementSibling.classList.add('active-tile');
        } else {
            activeTile.parentNode.classList.add('row-full');
        }

    } else if (key === 'ENTER') {
        let row = document.querySelector('.row-full');

        if (row) {
            let word = [...row.querySelectorAll('.board-tile')].map(tile => tile.innerHTML).join('');
            console.log(word);
            validateWord()
        } else {
            showError('Please enter 5 letters!');
        }

    } else if (key === 'DEL' || key === 'BACKSPACE') {

        if (!activeTile) {
            let lastTileInRow = document.querySelector('.row-full').querySelectorAll('.board-tile')[4];
            lastTileInRow.innerHTML = '';
            lastTileInRow.classList.add('active-tile');
        } else if (activeTile.previousElementSibling) {
            activeTile.previousElementSibling.innerHTML = '';
            activeTile.classList.remove('active-tile');
            activeTile.previousElementSibling.classList.add('active-tile');
        }
    }
}

function validateWord() {

}

function showError(msg) {
    console.log(msg);
}

window.onkeyup = function (key) {
    pressKey(key.key.toUpperCase());
}

window.onload = function () {
    createBoard();
    createKeyboard();
}