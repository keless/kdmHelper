class DeckHLModel extends DeckModel {
  constructor() {
    super("HL")

    this.verbose = true
    //inherited: 
    // this.cards = []
  }

  _createDeckFromJsonArray(array) {
    var deck = []
    for (var jsonCard of array) {
      if (this.verbose) {
        //console.log("create card for " + jsonCard.name )
      }
      
      var cardModel = new CardHLModel()
      cardModel.loadFromJson(jsonCard)
      deck.push(cardModel)
    }
    return deck
  }

  createDeckForMonster(name) {
    //1) get cards for the given monster, and sort them by type
    var monsterCards = this.getAllJsonCardsForMonster(name, g_decks["HLDecks"])

    this.cards = this._createDeckFromJsonArray(monsterCards)

    this.shuffleDeck()

    return true
  }
}