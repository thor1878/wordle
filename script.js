const NUM_ROWS = 6;
const NUM_COLS = 5;

var allWords;
var chosenWord;

var keyboardActive = true;

// Main function that runs when all contents are loaded
window.onload = function () {
    fetch('words.json')
    .then(response => response.json())
    .then(data => allWords = data.words)
    .then(() => {
        // chosenWord = allWords[Math.floor(Math.random() * allWords.length)];
        chosenWord = 'basic';
        createBoard();
        createKeyboard();
    })
}

// Create a NUM_COLS x NUM_ROWS board of tiles
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

    // Set the first tile in the first row as 'active'
    gameBoard.firstElementChild.firstElementChild.classList.add("active-tile");
}

// Create the keyboard
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
        keyButton.onanimationend = function () {
            keyButton.style.animationName = 'none';
        }
        keyboardRow.appendChild(keyButton);
    }
}

// Handle the press of a single key
function pressKey(key) {
    if (!keyboardActive) return;

    let activeTile = document.querySelector('.active-tile');

    // Key pressed between A - Z
    if (key.length === 1 && key.match(/[A-Z]/) && activeTile) {
        
        activeTile.innerHTML = key;
        activeTile.classList.remove('active-tile');
        
        if (activeTile.nextElementSibling) {
            activeTile.nextElementSibling.classList.add('active-tile');
        } else {
            activeTile.parentNode.classList.add('row-full');
        }

        animateKey(key);
        
    // ENTER key pressed
    } else if (key === 'ENTER') {
        let row = document.querySelector('.row-full');
        
        if (row) {
            // word is a string of lowercase letters
            let word = [...row.querySelectorAll('.board-tile')]
            .map(tile => tile.innerHTML)
            .join('')
            .toLowerCase();
            
            checkWord(word, row);
        } else {
            showError('Please enter 5 letters!');
        }

        animateKey(key);

    // DELETE or BACKSPACE key pressed
    } else if (key === 'DEL' || key === 'BACKSPACE') {
        if (!activeTile) {
            let lastTileInRow = document.querySelector('.row-full').querySelectorAll('.board-tile')[NUM_COLS-1];
            lastTileInRow.innerHTML = '';
            lastTileInRow.classList.add('active-tile');
            document.querySelector('.row-full').classList.remove('row-full');
        } else if (activeTile.previousElementSibling) {
            activeTile.previousElementSibling.innerHTML = '';
            activeTile.classList.remove('active-tile');
            activeTile.previousElementSibling.classList.add('active-tile');
        } else {
            showError('Enter a key instead of deleting');            
        }

        animateKey(key);
    }

    
}

// Check if the entered word is in the list and how many of the letters are correct
function checkWord(word, row) {
    if (!allWords.includes(word)) {
        showError('The word is not in the list!')
    } else {
        let tiles = row.querySelectorAll('.board-tile');

        // Animate tiles
        tiles.forEach((tile, i) => {
            tile.style.animationName = 'rotateTile';
            tile.style.animationDelay = `${i/4}s`;
        })


        // Change tiles color
        // for (let i = 0; i < word.length; i++) {
        //     if (word[i] === chosenWord[i]) {                
        //         tiles[i].style.backgroundColor = 'var(--green)';
        //         tiles[i].style.borderColor = 'var(--green)';
        //     } else if (chosenWord.includes(word[i])) {
        //         tiles[i].style.backgroundColor = 'var(--yellow)';
        //         tiles[i].style.borderColor = 'var(--yellow)';
        //     } else {
        //         tiles[i].style.backgroundColor = 'var(--gray)';
        //         tiles[i].style.borderColor = 'var(--gray)';
        //     }

        //     tiles[i].style.color = 'var(--white)';  
        // }
        for (let i = 0; i < word.length; i++) {
            if (word[i] === chosenWord[i]) {                
                tiles[i].style.setProperty('--backgroundColor', 'var(--green)');
                tiles[i].style.setProperty('--borderColor', 'var(--green)');
                document.querySelector(`#${word[i].toUpperCase()}`).style.backgroundColor = 'var(--green)';
            } else if (chosenWord.includes(word[i])) {
                tiles[i].style.setProperty('--backgroundColor', 'var(--yellow)');
                tiles[i].style.setProperty('--borderColor', 'var(--yellow)');
                document.querySelector(`#${word[i].toUpperCase()}`).style.backgroundColor = 'var(--yellow)';
            } else {
                tiles[i].style.setProperty('--backgroundColor', 'var(--gray)');
                tiles[i].style.setProperty('--borderColor', 'var(--gray)');
                document.querySelector(`#${word[i].toUpperCase()}`).style.backgroundColor = 'var(--darkGray)';
            }

            tiles[i].style.setProperty('--color', 'var(--white)'); 
        }



        // Remove class from row and change active tile
        row.classList.remove('row-full');
        
        if (row.nextElementSibling) {
            row.nextElementSibling.firstElementChild.classList.add('active-tile');
        }

        if (word === chosenWord) {
            keyboardActive = false;
        }
    }
}

// Animate single key on virtual keyboard on key press
function animateKey(key) {
    if (key === 'BACKSPACE') {
        key = 'DEL';    
    }
    let keyElement = document.querySelector(`#${key}`);
    keyElement.style.animationName = 'keyFade';
}

// Show an error message
function showError(msg) {
    console.log(msg);
}

// Function to call when an keyup event is registered
window.onkeyup = function (keyPressed) {
    pressKey(keyPressed.key.toUpperCase());
}