"use strict"; //ES6

class GameplayState extends AppState {
	constructor(params) { 
		super();

		var saveGameID = params[0] || "test"
		var monsterName = params[1]  || "lion"
		var level = params[2] || 0

		this.model = new GameplayStateModel(this, saveGameID, monsterName, level);
		this.view = new GameplayStateView(this.model);
	}
	
}

GameplayState.battleLog = function(message) {
	EventBus.game.dispatch({ "evtName":"battleLog", "log":message})
}

// conforms to ICastPhysics 
class GameplayStateModel extends BaseStateModel {
	constructor( state, saveGameID, monsterName, level ) {
		super()

		this.pState = state
		this.deckAI = null
		this.deckAIDiscard = new DeckModel("AIDiscard")
		this.deckHL = null
		this.deckHLDiscard = new DeckModel("HLDiscard")

		this.deckWounds =  new DeckModel("AIWounds")
		
		this.settlement = new SettlementModel()

		this.monsterName = monsterName
		this.monsterLevel = level
		this.monsterModel = null

		this.battleLog = []

		if (!saveGameID || saveGameID == "test") {
			this.saveGameID = "test"
			console.log("load TEST settlement")
			this._createTestSettlement()
		} else {
			this.saveGameID = saveGameID
			console.log("todo: LOAD settlement " + this.saveGameID)
			var saveData = Service.Get("sd")
			var saveJson = saveData.load(this.saveGameID)
			if (saveJson == null) {
				console.log("starting NEW settlement")
				this.createNewSettlement()
				this.saveSettlementJson(this.saveGameID)
			} else {
				this.loadSavedSettlementJson(saveJson)
			}
		}

		this.SetListener("battleLog", this.onBattleLog, EventBus.game)
	}

	onBattleLog(e) {
		this.battleLog.push(e.log)
		EventBus.ui.dispatch("battleLogUpdate")
	}

	getMonsterHitPoints() {
		return this.deckAI.getNumCards() + this.deckAIDiscard.getNumCards() + 1
	}

	getBattleSurvivorByIdx( battleIdx ) {
		//todo: settlement.survivors idx != battleIdx
		return this.settlement.survivors[battleIdx]
	}

	createNewSettlement() {
		this.loadForMonster()
		this.settlement._testCreateSurvivors()
	}

	_createTestSettlement() {
		this.loadForMonster()

		this.settlement._testCreateSurvivors()
		this.settlement._testCreateResources()
		this.settlement._testSetPrincipals()
	}

	loadSavedSettlementJson(json) {
		this.loadForMonster() //todo: replace this when we save actual battle state
		this.settlement.loadFromJson(json.settlement)
	}
	saveSettlementJson(saveGameID) {
		var saveData = Service.Get("sd")
		var settlementJson = this.settlement.saveToJson()

		var timeSeconds =  Math.round(new Date().getTime()/1000)
		var saveGame = { "lastPlayed":timeSeconds, "settlement":settlementJson }

		saveData.save(saveGameID, saveGame)
	}

	loadForMonster() {
		this.monsterModel = new MonsterModel(this.monsterName, this.monsterLevel)

		this.deckAI = new DeckAIModel()
		this.deckAI.createDeckForMonster(this.monsterName, this.monsterLevel)

		this.deckHL = new DeckHLModel()
		this.deckHL.createDeckForMonster(this.monsterName, this.monsterLevel)
	}

	//return true if wound applied, false if no AI cards left (so should apply to last hitpoint, game over!)
	woundTheMonsterAIDeck() {
		if (this.deckAI.getNumCards() == 0 && this.deckAIDiscard.getNumCards() == 0) {
			return false //monster has no AI cards left!
		}

		var woundCard = this.drawXCardsFromDeckShufflingDiscardIfNeccessary(1, this.deckAI, this.deckAIDiscard)[0]

		this.deckWounds.placeOnTop(woundCard, false)

		return true
	}

	// functions for wound flow substates to call
	drawHitLocations(numHits) {
		var drawnCards = this.drawXCardsFromDeckShufflingDiscardIfNeccessary(numHits, this.deckHL, this.deckHLDiscard)

		if (drawnCards.length != numHits) {
			console.error("drawHitLocations failed to return as many cards as requested " + drawnCards.length + " vs " + numHits)
		}

		return drawnCards
	}

	discardHLCards( cardArray ) {
		for (var card of cardArray) {
			this.deckHLDiscard.placeOnTop(card, true)
		}
	}

	shuffleAllHLCardsTogether() {
		this.deckHL.shuffleInDiscardPile(this.deckHLDiscard)
	}

	discardAICards( cardArray ) {
		for (var card of cardArray) {
			this.deckAIDiscard.placeOnTop(card, true)
		}
	}

	// return CardAIModel or null
	drawNextAICard() {
		var drawnCards = this.drawXCardsFromDeckShufflingDiscardIfNeccessary(1, this.deckAI, this.deckAIDiscard)
		if (drawnCards.length == 0) {
			return null
		} else {
			var card = drawnCards[0]
			card.faceUp = true
			return card
		}
	}

	drawXCardsFromDeckShufflingDiscardIfNeccessary(numCards, deck, discard) {
		//1) draw HL cards until HL deck is empty, or we reach numHits
		var firstDrawLength = Math.min( deck.getNumCards(), numCards )
		var drawnCards = deck.drawXCards(firstDrawLength)

		//2) if HL deck is empty, shuffle discard pile into it
		if (deck.getNumCards() == 0) {
			deck.shuffleInDiscardPile(discard)
		}

		//3) if we still need to draw more cards, draw more
		if(drawnCards.length < numCards ) {
			var cardsStillNeeded = (numCards - drawnCards.length)
			if ( cardsStillNeeded > deck.getNumCards()) {
				console.warn("asking for more cards than deck has, even after we suffled the discard pile into it")
			}

			var secondDraw = deck.drawXCards(cardsStillNeeded)
			drawnCards.concat(secondDraw)
		}

		return drawnCards
	}
}
