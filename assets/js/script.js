/*This card class accepts an index 0-51 and returns a card object

The object has a suit, number, and color derived from the index
which is also provided
*/
class Card {
    constructor(index) {
        this.index = index;
        this.suit = this.getSuit(index);
        this.number = this.getNumber(index);
        this.color = this.getColor()
    }
    // Init Functions for the this.properties
    getSuit(index) {
        if (index > 51 || index < 0) {
            return console.error("Provided index is out of range at Card.getSuit")
        }
        const faceIndex = Math.floor(index / 13);
        const face = (faceIndex === 0 && "heart") ||
            (faceIndex === 1 && "spade") ||
            (faceIndex === 2 && "club") ||
            (faceIndex === 3 && "diamond")
        return face
    };
    getNumber(index) {
        return Math.floor(index % 13) + 1;
    }
    getColor() {
        return (this.suit === "spade" || this.suit === "club") && "black" ||
            (this.suit === "diamond" || this.suit === "heart") && "red"
    }
}

/*This Deck class creates an array as the this.deck
It then adds 52 card objects to this.deck
The card objects are created with the Card class
These objects are then shuffled with the shuffle function
The deck will shuffle once upon creation [with new keyword]
*/
class Deck {
    constructor(howManyDecks = 1) {
        this.deck = [];
        for (let i = 0; i < howManyDecks; i++) {
            for (let i = 0; i < 52; i++) {
                this.deck.push(new Card(i))
            }
        }
        this.shuffle()
    }
    // shuffle was written by Jeff Conrad
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
    pullCard() {
        return this.deck.shift()
    }
}

/*This Hand class creates an array as this.hand
this.hand will be where cards are stored

The deal function adds whatever you give it to the this.hand array

The total function returns the current total of the hand

The status function returns if the hand
is 'under' 21,
or 'bust'ed over 21,
or else it must be 'blackjack'

*/
class Hand {
    constructor() {
        this.hand = [];
    }
    deal(cardObject) {
        this.hand.push(cardObject)
    }
    total() {
        let total = 0;
        console.log(this.hand)
        this.hand.forEach(card => {
            total = total + card.number
        })
        return total
    }
    status() {
        if (this.total < 21) {
            return "under";
        } else if (this.total > 21) {
            return "bust";
        } else {
            return "blackjack"
        }
    }
}


/*pseudo code/game rules for game logic:
    rules: all cards to player are dealt face up
        value of aces are 1 or 11, rule to 1 or 11 if hand + 11 <= 21 then the ace is worth 11 otherwise its worth 1
 
    
    deal a card to player
    deal a card to the dealer face down
    deal a card to player
    deal a card to the dealer face up
 
    rules for blackjack after the deal
        if player has blackjack flip dealers down card face up, check for dealer blackjack if dealer has blackjack its a push otherwise player wins
        if the dealer has an ace for his up card (get the sum of the dealers hand) if the dealer has blackjack flip the down card to show the  blackjack, player loses
 
    continuing game play past the initial deal
        Player is asked to take a hit or stay
            hit the player gets a card the value of the card is added to the hand if it exceeds 21 the player loses the hand
            the player can hit as many times as they like until they stay or until they bust.
        player stays play is turned over to dealer
            if the dealer has a score of less than 17 they will take hits until their score >= 17 or they bust
        after the dealer is done hitting or has stood the two hands are compared for scoring 
        player > dealer player wins
        player < dealer player loses
        player = dealer its a push
 
*/
/*This Game class has a function called loadGame.

LoadGame first tries to create a variable of the saved
board and deck from local storage.
It then creates a new version of the board and the deck.
IF the saves were able to be recovered they will overwrite the
new instances of the board and deck (each handled individually).
or ELSE if the saves were not found the new version is saved to local storage.
Whichever version was left after this process is then returned in an array

this.table gets its value from the loadGame function.
this.deck also gets its value from the loadGame function.

If anything happens in the table or deck you will need to call the saveGame() function.
failing to do this will result in the previous version of the object being loaded

The clearTable function removes the table key from local storage,
as the clearDeck function removes the deck.
The next time these are accessed new versions will be created.
*/
class Game {
    constructor() {
        this.tableStorageKey = "playingTable"
        this.deckStorageKey = "cardDeck"
        this.table = this.loadGame()[0]
        this.deck = this.loadGame()[1]

    }
    saveGame() {
        localStorage.setItem(this.tableStorageKey, JSON.stringify(this.table));
        localStorage.setItem(this.deckStorageKey, JSON.stringify(this.deck))
    }
    loadGame() {
        const savedBoardJson = localStorage.getItem(this.tableStorageKey);
        const savedDeckJson = localStorage.getItem(this.deckStorageKey);

        let playTable = {
            player: new Hand,
            dealer: new Hand,
        };
        let deck = new Deck(1)

        if (savedBoardJson) {
            playTable = JSON.parse(localStorage.getItem(this.tableStorageKey));
        } else {
            localStorage.setItem(this.tableStorageKey, JSON.stringify(playTable));
        }

        if (savedDeckJson) {
            deck = JSON.parse(localStorage.getItem(this.deckStorageKey));
        } else {
            localStorage.setItem(this.deckStorageKey, JSON.stringify(deck))
        }


        return [playTable, deck]
    }
    // TODO: Create a function that can take a card off the deck and deal it to a board

    clearTable() {
        localStorage.removeItem(this.tableStorageKey);
    }
    // TODO: Create a function that replaces the current deck
    clearDeck() {
        localStorage.removeItem(this.deckStorageKey);
    }
    // TODO: Create a function that returns the winner ('dealer' or 'player') or undefined if no one has won
    winner() { }
}

const playerArea = document.querySelector("#player");
const dealerArea = document.querySelector("#dealer");

for (let i = 0; i < 6; i++) {
    const card = createCard(i, "heart")
    playerArea.append(card)
}