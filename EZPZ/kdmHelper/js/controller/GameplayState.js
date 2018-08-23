"use strict"; //ES6

class GameplayState extends AppState {
	constructor(saveGameID) { 
		super();

		this.model = new GameplayStateModel(this, saveGameID);
		this.view = new GameplayStateView(this.model);
	}
	
}

// conforms to ICastPhysics 
class GameplayStateModel extends BaseStateModel {
	constructor( state, saveGameID ) {
		super()
		


		this.pState = state
		this.deckAI = null
		this.deckAIDiscard = new DeckModel()
		this.deckHL = null
		this.deckHLDiscard = new DeckModel()

		this.settlement = new SettlementModel()

		if (!saveGameID || saveGameID == "test") {
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

		

		this.SetListener("hlDeckClicked", this.onHLDeckClicked)
		this.SetListener("aiDeckClicked", this.onAIDeckClicked)
	}

	createNewSettlement() {
		this.loadForMonster("lion", 0)
		this.settlement._testCreateSurvivors()
	}

	_createTestSettlement() {
		this.loadForMonster("lion", 1)

		this.settlement._testCreateSurvivors()
		this.settlement._testCreateResources()
		this.settlement._testSetPrincipals()
	}

	loadSavedSettlementJson(json) {
		this.loadForMonster("lion", 1)
		this.settlement.loadFromJson(json)
	}
	saveSettlementJson(saveGameID) {
		var saveData = Service.Get("sd")
		var settlementJson = this.settlement.saveToJson()
		saveData.save(saveGameID, settlementJson)
	}

	loadForMonster(monsterName, level) {
		this.deckAI = new DeckAIModel()
		this.deckAI.createDeckForMonster(monsterName, level)

		this.deckHL = new DeckHLModel()
		this.deckHL.createDeckForMonster(monsterName)
	}

	onHLDeckClicked(e) {
		console.log("hit location deck clicked")
		//pull a cardout of HL and discard it
		if (this.deckHL.getNumCards() > 0) {
			var card = this.deckHL.drawXCards(1)[0]
			card.faceUp = true
			this.deckHLDiscard.placeOnTop(card)
		} else {
			console.log("deck empty, aborting")
		}
	}

	onAIDeckClicked(e) {
		console.log("AI deck clicked")
		//pull a cardout of HL and discard it
		if (this.deckAI.getNumCards() > 0) {
			var card = this.deckAI.drawXCards(1)[0]
			card.faceUp = true
			this.deckAIDiscard.placeOnTop(card)
		} else {
			console.log("deck empty, aborting")
		}
	}

	Destroy() {
		super.Destroy()
	}
	
	Update(ct, dt) {
		super.Update(ct, dt);
		
		/*
		for( var e of this.entities ) {
			e.Update(ct, dt);
		}
		*/
	}
}
