const prompt = require("prompt-sync")()
const c = require("ansi-color")

const gridSize = 3 //6 is the max

let grid = [] // A nested array containing the cards

const clearScreen = () => {
    process.stdout.write("\u001b[2J\u001b[0;0H");
  };

//Main program

clearScreen();

gameSetup(grid, gridSize);

runGame()



///////////////////////////////////

function runGame() {

    displayGrid(grid)
    let samePair = true

    while (samePair) {
        card1Coor = chooseCard(1)
        card2Coor = chooseCard(2)

        if (JSON.stringify(card1Coor) == JSON.stringify(card2Coor)) {
            console.log("Input is the same. Try again.")
        } else {
            samePair = false
        }
    }

    rightPair = showChosenCard(card1Coor, card2Coor)

    if (!checkWin()) {
        setTimeout(() => {
            console.clear()
            runGame()
        }, 3000);
    } else {
        console.log("Congratulations! You win!")
    }
}

function checkWin() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== "#") {
                return false
            }
        }
    }
    return true
}

function convertCoor(cardNumber) {

    cardRow = Math.floor((cardNumber - 1) / (gridSize + 1))

    cardCol = ((cardNumber - 1) % (gridSize + 1))

    return [cardRow, cardCol]
}

function gameSetup(grid, gridSize) {

    // setup an array - deck - containing the charaters to be distributed

    const alpha = Array.from(Array(gridSize * (gridSize + 1) / 2)).map((e, i) => i + 65);
    let deck = alpha.map((x) => String.fromCharCode(x));
    deck = deck.flatMap(i => [i, i]) //duplicate all elements in the deck

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize + 1; j++) {
            const randomIndex = Math.floor(Math.random() * deck.length)
            grid[i][j] = deck[randomIndex]
            deck.splice(randomIndex, 1)
        }
    }
}

function displayGrid(grid) {

    console.log(`\nMemory card game\n`)
    let counter = 1

    for (let i = 0; i < grid.length; i++) {
        let row = `   `;
        for (let j = 0; j < grid[i].length; j++) {

            if (grid[i][j] === "#") {
                row += ` ${' #'} `
            } else {
                row += ` ${counter.toString().length === 1 ? ' ' + counter : counter} `;
            }
            counter++
        }
        console.log(row);
    }
    console.log()
}

function chooseCard(cardNum) {

    while (true) {
        const card = Number(prompt(`Choose the ${cardNum === 1 ? "first" : "second"} card:`))

        if (isNaN(card)) {
            console.log("Input is not an integer, please try again.")

        } else if (card < 1 || card > gridSize * (gridSize + 1)) {
            console.log("Card number invalid, please try again.")

        } else if (!Number.isInteger(card)) {
            console.log("Input is not an integer, please try again.")
        }
        else {
            cardCoor = convertCoor(card)

            if (grid[cardCoor[0]][cardCoor[1]] === "#") {
                console.log("Card already matched. Please choose another card.")

            } else {
                return cardCoor
            }
        }
    }
}

function showChosenCard(card1Coor, card2Coor) {

    console.log()

    let counter = 1

    for (let i = 0; i < grid.length; i++) {
        let row = `   `;
        for (let j = 0; j < grid[i].length; j++) {

            if ((i === card1Coor[0] && j === card1Coor[1]) || (i === card2Coor[0] && j === card2Coor[1])) {
                row += ` ${' ' + grid[i][j]} `;

            } else if (grid[i][j] === "#") {
                row += ` ${' #'} `

            } else {
                row += ` ${counter.toString().length === 1 ? ' ' + counter : counter} `;
            }
            counter++
        }
        console.log(row);
    }
    console.log()
    if (grid[card1Coor[0]][card1Coor[1]] === grid[card2Coor[0]][card2Coor[1]]) {

        console.log("Your are right!")
        grid[card1Coor[0]][card1Coor[1]] = '#'
        grid[card2Coor[0]][card2Coor[1]] = '#'

    } else {
        console.log("Your are wrong! Try again.")
    }

    console.log()

    // setTimeout(() => {
    //     console.clear();
    // }, 5000);
}
