const prompt = require("prompt-sync")()
const c = require("ansi-color")

const gridSize = 3 //6*7 = 42 which is the max

let grid = [] // A nested array containing the cards
let cardsCoor = []
let rightPair = false


//Main program

gameSetup(grid, gridSize);

while (true) {

    displayGrid(grid)

    cardsCoor = chooseCard()

    rightPair = showChosenCard(cardsCoor[0], cardsCoor[1])

}


function convertCoor (cardNumber) {

    cardRow = Math.floor((cardNumber - 1) / (gridSize + 1))

    cardCol = ((cardNumber -1) % (gridSize + 1))

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
    card1 = Number(prompt(`Choose the first card:`))

    card1Coor = convertCoor(card1)    

    console.log ("Card1row: ", card1Coor[0])
    console.log ("Card1col: ", card1Coor[1])

    card2 = Number(prompt("Choose the second card:"))

    card2Coor = convertCoor(card2)    

    console.log ("Card2row: ", card2Coor[0])
    console.log ("Card2col: ", card2Coor[1])

    return [card1Coor, card2Coor]
}

function showChosenCard(card1Coor, card2Coor) {

    let counter = 1

    console.log(card1Coor, card2Coor)

    for (let i = 0; i < grid.length; i++) {
        let row = `   `;
        for (let j = 0; j < grid[i].length; j++) {

            if ((i === card1Coor[0] && j === card1Coor[1]) || (i === card2Coor[0] && j === card2Coor[1])) {
                row += ` ${' ' + grid[i][j]} `;
            // } else if (counter === cards[1]) {
            //     row += ` ${' ' + grid[i][j]} `;
            // } else if (grid[i][j] === "#") {
            //     row += ` ${' #'} `
            } else {
                row += ` ${counter.toString().length === 1 ? ' ' + counter : counter} `;
            }
            counter++
        }
        console.log(row);
    }

    console.log()
    console.log(card1Coor, card2Coor)

    if (grid[card1Coor[0]][card1Coor[1]] === grid[card2Coor[0]][card2Coor[1]]) {

        console.log("Your are right!")
        grid[card1Coor[0]][card1Coor[1]] = '#'
        grid[card2Coor[0]][card2Coor[1]] = '#'

    } else {
        console.log("Your are wrong! Try again.")
    }

    //return card1 === card2
    // setTimeout(() => { console.clear() }, 5000)
}

// function updateGrid(cards) {
//     let counter = 1

//     for (let i = 0; i < grid.length; i++) {
//         for (let j = 0; j < grid[i].length; j++) {
//             if (counter === cards[0] || counter === cards[1]) {
//                 grid[i][j] = "#"
//             }
//             counter++
//         }
//     }
// }
