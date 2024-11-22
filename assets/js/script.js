
/* This function creates an array to index the cards for the game.  It first creates the 52 indexes sequentially, after doing so it shuffles them into a random order returning the randomized array.
*/

class Deck {
    constructor() {
        this.deck = [];
        for (let i = 0; i < 52; i++) {
            this.deck.push(i)
        }
    }
    shuffle() {
        let array = this.deck
        let tmp, current, top = this.deck.length;

        if (top) while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    }
}
const deck = new Deck;

// Accepts a 
// *Card number 0-12
// Suit = heart, spade, diamond, club
function createCard(number, suit) {
    // add one to 0 indexed input number
    const inputNumber = number + 1;
    // create a div for the card body
    const cardBody = document.createElement("div");
    cardBody.className = "playingCard"
    cardBody.style.backgroundColor = "hsl(48, 39%, 83%)";
    cardBody.style.display = "flex";
    cardBody.style.width = "2.5in";
    cardBody.style.height = "3.5in";
    cardBody.style.borderRadius = "10px";
    cardBody.style.position = "relative";
    cardBody.style.padding = "15px"


    // Creates two spans that are positioned absolutely
    function appendSpans() {
        const color = ((suit === "heart" || suit === "diamond") && "red") || "black";
        const span0 = document.createElement("span");
        span0.style.position = "absolute";
        span0.style.fontSize = "32px";
        span0.style.fontWeight = "bolder";
        span0.style.fontFamily = "serif";
        span0.style.left = "10px";
        span0.style.top = "10px"
        span0.style.color = color;
        span0.textContent = inputNumber

        const span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.fontSize = "32px";
        span1.style.fontWeight = "bolder";
        span1.style.fontFamily = "serif";
        span1.style.right = "10px";
        span1.style.bottom = "10px"
        span1.style.transform = "rotate(180deg)";
        span1.style.color = color;
        span1.textContent = inputNumber
        if (inputNumber === 11) {
            span0.textContent = "J";
            span1.textContent = "J";
        }
        if (inputNumber === 12) {
            span0.textContent = "Q";
            span1.textContent = "Q";
        }
        if (inputNumber === 13) {
            span0.textContent = "K";
            span1.textContent = "K";
        }

        cardBody.append(span0, span1)
    }
    appendSpans();

    // Creates 3 equal sized coloums and returns them in an array
    function columns() {
        const columns = []
        for (let i = 0; i < 3; i++) {
            const column = document.createElement("div");
            column.style.display = "flex";
            column.style.flexDirection = "column";
            column.style.flex = "1";
            column.style.height = "100%"
            columns.push(column)

        }
        return columns
    }

    // create an array and assign each colon
    const columnArray = columns();
    const leftColumn = columnArray[0]
    const centerColumn = columnArray[1]
    const rightColumn = columnArray[2]
    const allSymbols = [];

    if (typeof inputNumber === "number") {
        const symbolSource = (suit === "heart" && "./assets/cardAssets/symbols/hearts.png") ||
            (suit === "club" && "./assets/cardAssets/symbols/clubs.png") ||
            (suit === "diamond" && "./assets/cardAssets/symbols/diamonds.png") ||
            (suit === "spade" && "./assets/cardAssets/symbols/spades.png");
        for (let i = 0; i < inputNumber; i++) {
            const symbolElement = document.createElement("img");

            symbolElement.src = symbolSource;
            symbolElement.style.height = "auto";
            symbolElement.style.width = "50%";
            symbolElement.style.alignitems = "space-between"
            symbolElement.style.margin = "auto"

            allSymbols.push(symbolElement)
        }
    }
    cardBody.append(leftColumn, centerColumn, rightColumn)

    if (allSymbols.length < 4) {
        allSymbols.forEach(Element => {
            centerColumn.append(Element)
        });
    }
    let originalLength = allSymbols.length;;
    if (allSymbols.length >= 4 && allSymbols.length <= 10) {
        if (originalLength % 2 === 1) {
            centerColumn.append(allSymbols.pop());
        }
        originalLength = allSymbols.length;
        for (let i = 0; i < originalLength / 2; i++) {
            leftColumn.append(allSymbols.pop())
            rightColumn.append(allSymbols.pop())
        }
    }
    if (allSymbols.length === 11) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/jackRed.svg")') || 'url("./assets/cardAssets/svg/jackBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        centerColumn.append(allSymbols.pop(), allSymbols.pop())

    } else if (allSymbols.length === 12) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/queenRed.svg")') || 'url("./assets/cardAssets/svg/queenBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain"
        centerColumn.append(allSymbols.pop())
    } else if (allSymbols.length === 13) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/kingRed.svg")') || 'url("./assets/cardAssets/svg/kingBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain";
        centerColumn.append(allSymbols.pop());
    }

    return cardBody
}