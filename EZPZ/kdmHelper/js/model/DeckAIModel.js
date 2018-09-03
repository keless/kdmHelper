class DeckAIModel extends DeckModel {
  constructor() {
    super("AI")

    this.verbose = false
    //inherited: 
    // this.cards = []
  }

  _createDeckFromJsonArray(array) {
    var deck = []
    for (var jsonCard of array) {
      if (this.verbose) {
        console.log("create card for " + jsonCard.name )
      }
      var cardModel = new CardAIModel()
      cardModel.loadFromJson(jsonCard)
      deck.push(cardModel)
    }
    return deck
  }

  createDeckForMonster(name, level) {
    //1) get cards for the given monster, and sort them by type
    var monsterCards = this.getAllJsonCardsForMonster(name, g_decks["AIDecks"])
    var sortedCards = { "basic":[], "advanced":[], "legendary":[], "special":[]  }
    for (var card of monsterCards) {
      sortedCards[card.type].push(card)
    }

    //2) get the matching rule for the monster at the appropriate level
    var rules = null
    for (var rule of g_decks["Rules"]) {
      if (rule.monster == name && rule.level == level) {
        rules = rule
      }
    }
    if (rules == null) {
      console.error("failed to find rule for monster " + name + " : lvl " + level)
      return false
    }

    //3) Apply rules to build deck
    var jsonDeck = []
    //3.1) get special cards first
    if (rules.hasOwnProperty('special')) {
      var specialCards = []
      if (!Array.isArray(rules.special)) {
        specialCards.push(rules.special)
      } else {
        specialCards = rules.special
      }

      var specialDrawPile = sortedCards["special"]
      for( var sCard of specialCards) {
        var result = this._extractCardFromArray(sCard, specialDrawPile)
        specialDrawPile = result.array
        if (result.card != null) {
          jsonDeck.push(result.card)
          console.log("added special card "+ sCard)
        } else {
          console.error("couldnt find special card " +sCard+ " for monster " + name + " : lvl " + level)
          return false
        }
      }
    }

    //3.2) get legendary cards
    var numLegendary = rules.legendary
    if (numLegendary > sortedCards["legendary"]) {
      console.error("rules specify too many (" +numLegendary+ ") legendary cards for monster " + name + " : lvl " + level)
      return false
    }
    var randomLegendary = this._extractXCardsFromArray(numLegendary, sortedCards["legendary"])
    jsonDeck = jsonDeck.concat(randomLegendary.cards)

    //3.3) get advanced cards
    var numAdvanced = rules.advanced
    if (numAdvanced > sortedCards["advanced"]) {
      console.error("rules specify too many (" +numAdvanced+ ") advanced cards for monster " + name + " : lvl " + level)
      return false
    }

    if (name == "lion" && level == 0) {
      jsonDeck = jsonDeck.concat(this._getCardJsons(sortedCards["advanced"], ["Maul", "Terrifying Roar", "Enraged"]))
    } else {
      var randomAdvanced = this._extractXCardsFromArray(numAdvanced, sortedCards["advanced"])
      jsonDeck = jsonDeck.concat(randomAdvanced.cards)
    }

    //3.4) get basic cards
    var numBasic = rules.basic
    if (numBasic > sortedCards["basic"]) {
      console.error("rules specify too many (" +numBasic+ ") basic cards for monster " + name + " : lvl " + level)
      return false
    }
    if (name == "lion" && level == 0) {
      jsonDeck = jsonDeck.concat(this._getCardJsons(sortedCards["basic"], ["Claw", "Chomp", "Size Up", "Power Swat", "Grasp"]))
    } else {
      var randomBasic = this._extractXCardsFromArray(numBasic, sortedCards["basic"])
      jsonDeck = jsonDeck.concat(randomBasic.cards)
    }

    //4) create the cardModels
    this.cards = this._createDeckFromJsonArray(jsonDeck)

    //5) shuffle deck!
    this.shuffleDeck()

    if (name == "lion" && level == 0) {
      //make "Claw" the first card
      var cardIdx = this.cards.findIndex((e)=>{ return e.name == "Claw" })
      if (cardIdx == -1) { 
        console.error("couldnt find special card for lion 0")
      }
      var clawCard = this.cards.splice( cardIdx, 1 )[0]
      this.cards.push(clawCard)
    }

    return true
  }

  _getCardJsons(array, nameArr) {
    var result = []
    for (var name of nameArr) {
      var cardJson = array.find((e)=> { return e.name == name })
      result.push(cardJson)
    }

    return result
  }
}