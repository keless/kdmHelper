class DeckInnovationsModel extends DeckModel {
    constructor() {
      super()
  
      this.name = "Innovations"
      this.verbose = true
      //inherited: 
      // this.cards = []
    }

    createDeckForSettlement(settlementModel) {
        var deckJson = this._getUnlockedInnovations(settlementModel)

        this.cards = this._createDeckFromJsonArray()

        this.shuffleDeck()

        return true
    }

    _createDeckFromJsonArray(array) {
        var deck = []
        for (var jsonCard of array) {
            if (this.verbose) {
                //console.log("create card for " + jsonCard.name )
            }
            
            var cardModel = new CardModel()
            cardModel.loadFromJson(jsonCard)
            deck.push(cardModel)
        }
        return deck
    }

    _getUnlockedInnovations(settlementModel) {
        var innovations = settlementModel.innovations
        var deckJson = []

        var innovationData = g_decks["Innovations"]

        for( var innovation of innovations) {
            var innovationJson = this.innovationsJson.find((e)=> { return e.name == innovation; })
            if (!innovationJson.hasOwnProperty("unlocks")) {
                continue
            }
            var unlocks = innovationJson.unlocks
            for (var unlock of unlocks) {
                if (!innovation.includes(unlock)) {
                    deckJson.push(unlock)
                }
            }
        }

        console.log("unlocked innovations: " + deckJson)
        return deckJson
    }
}