const prompt = require("prompt-sync")()
const c = require("ansi-color")

const gridSize = 3 //6*7 = 42 which is the max

let grid = [] // A nested array containing the "cards"
let card1 = 0
let card2 = 0
let rightPair = false

gameSetup(grid, gridSize);

while (true) {

    displayGrid(grid)
    cards = chooseCard()
    rightPair = showChosenCard(cards)

    if (rightPair) {
        updateGrid(cards)
    }

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

}

function chooseCard() {
    card1 = Number(prompt(`Choose the first card:`, card1))
    card2 = Number(prompt("Choose the second card:", card2))

    return [card1, card2]
}

function showChosenCard(cards) {

    let counter = 1
    let card1 = ''
    let card2 = ''

    for (let i = 0; i < grid.length; i++) {
        let row = `   `;
        for (let j = 0; j < grid[i].length; j++) {

            if (counter === cards[0]) {
                row += ` ${' ' + grid[i][j]} `;
                card1 = grid[i][j] //save the value of card 1
            } else if (counter === cards[1]) {
                row += ` ${' ' + grid[i][j]} `;
                card2 = grid[i][j] //save the value of card 2
            } else if (grid[i][j] === "#") {
                row += ` ${' #'} `
            } else {
                row += ` ${counter.toString().length === 1 ? ' ' + counter : counter} `;
            }
            counter++
        }
        console.log(row);
    }
    return card1 === card2 //return if card1 equals card 2
    // setTimeout(() => { console.clear() }, 5000)
}

function updateGrid(cards) {
    let counter = 1

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (counter === cards[0] || counter === cards[1]) {
                grid[i][j] = "#"
            }
            counter++
        }
    }
}
