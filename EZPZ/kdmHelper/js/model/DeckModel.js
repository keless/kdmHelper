class DeckModel {
  constructor() {
    this.verbose = true

    this.name = "some deck"

    //note: this.cards[0] is the "bottom" card
    this.cards = []
  }

  getCardCount() {
    return this.cards.length
  }

  getAllJsonCardsForMonster(monsterName, jsonArray) {
    var result = []
    for (var json of jsonArray) {
      if (json.monster == monsterName) {
        result.push(json)
      }
    }
    return result
  }

  // returns count number of CardModels removing them from the top of the deck
  drawXCards(count) {
    if (count > this.cards.length) {
      console.warn("drawXCards asked to remove more cards than exist in the deck")
    }
    var drawnCards = this.cards.splice(0, count)
    return drawnCards
  }

  // place a card  on "top" of deck-- should NOT already be in the deck
  placeOnTop(card) {
    if(this.cards.includes(card)) {
      console.error("trying to place a card on top that already exists in deck")
    }

    this.cards.push(card)
    console.log("placed card on top " + card.name)
  }

  /// Utility functions

  // returns card (nullable), and array (modified)
  // attempts to find the first card with given name and remove it from the array
  //  in the case there are multiple cards with the same name in the array, it only removes the first
  _extractCardFromArray(cardName, array) {
    var foundIdx = array.findIndex(array, function(card) { return card.name === cardName; })
    if (foundIdx == -1 ) {
      //card not found
      console.warn("_extractCardFromArray could not find card " + cardName + " in array")
      return {"array":array, "card":null }
    }
    var card = array[foundIdx]
    array.splice(foundIdx, 1)
    return {"array":array, "card":card }
  }

   // similar to above, but returns a card randomly (ignoring name)
  _extractRandomCardFromArray(array) {
    if (array.length == 0) {
      //empty array
      console.warn("_extractRandomCardFromArray called on empty array")
      return {"array":array, "card":null }
    }

    var randIdx = getRand(0, array.length - 1)
    var card = array[randIdx]
    array.splice(randIdx, 1)
    return {"array":array, "card":card }
  }

  // returns cards (array), and array (modified)
  _extractXCardsFromArray(count, array) {
    var cards = []
    for (var i=0; i<count; i++) {
      var result = this._extractRandomCardFromArray(array)
      array = result.array
      cards.push(result.card)
    }
    return {"array":array, "cards":cards }
  }

  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  // apply Fisher–Yates shuffle algorithm
  shuffleDeck() {
    var j, x, i;
    for (i = this.cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = x;
    }

    if(this.verbose) {
      console.log("deck shuffled to new order: ")
      for( var card of this.cards) {
        console.log("  " + card.name)
      }
    }
  }
}