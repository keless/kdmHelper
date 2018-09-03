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

  createDeckForMonster(name, level) {
    //1) get cards for the given monster, and sort them by type
    var monsterCards = this.getAllJsonCardsForMonster(name, g_decks["HLDecks"])

    this.cards = this._createDeckFromJsonArray(monsterCards)

    this.shuffleDeck()

    if (name == "lion" && level == 0) {
      //make "Strange Hand" the first card
      var cardIdx = this.cards.findIndex((e)=>{ return e.name == "Strange Hand" })
      if (cardIdx == -1) { 
        console.error("couldnt find special card for lion 0")
      }
      var shCard = this.cards.splice( cardIdx, 1 )[0]
      this.cards.push(shCard)
    }

    return true
  }
}